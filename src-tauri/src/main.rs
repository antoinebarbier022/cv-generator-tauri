#![feature(try_blocks)]
#![feature(let_chains)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod errors;
mod menu;
use crate::commands::{ready_to_receive_errors, open_finder, open_powerpoint};
use crate::menu::{create_app_menu, on_menu_event};
use anyhow::{Context};
use core::str;
use libc::SIGTERM;
use signal_hook::iterator::Signals;
use std::sync::Mutex;
use std::{sync, thread};
use tauri::api::process::{Command, CommandEvent, TerminatedPayload};
use sync::mpsc::{channel, Sender};
use tauri::{Manager};
use window_vibrancy::*;
use crate::errors::{EmitError, ErrorPayload, ErrorsState};

fn start_backend(tx: Sender<BackendEvent>) -> anyhow::Result<()> {
    println!("Spawning api server...");
    spawn_backend(tx)?;

    Ok(())
}

enum BackendEvent {
    PortAlreadyInUseError
}

fn spawn_backend(tx: Sender<BackendEvent>) -> anyhow::Result<()> {
    let (mut rx, _) = Command::new_sidecar("api")
        .context("Failed to create `api` binary command")?
        .spawn()
        .context("Failed to spawn `api` sidecar")?;

    tauri::async_runtime::spawn(async move {
        while let Some(event) = rx.recv().await {
            match event {
                CommandEvent::Stderr(line) => print!("[API-LOG]: {line}"),
                CommandEvent::Stdout(line) => print!("[API]: {line}"),
                CommandEvent::Error(err) => println!("Error listening to api {err}"),
                CommandEvent::Terminated(TerminatedPayload { code, signal }) => {
                    let infos = vec![
                        code.map(|code| format!("code {code}")),
                        signal.map(|signal| format!("signal {signal}")),
                    ]
                    .into_iter()
                    .flatten()
                    .collect::<Vec<_>>()
                    .join(" and ");

                    if infos.trim().is_empty() {
                        println!("Api terminated.")
                    } else {
                        println!("Api terminated with {infos}.")
                    }

                    if let Some(48) = code {
                        tx.send(BackendEvent::PortAlreadyInUseError).unwrap()
                    }
                }
                event => {
                    println!("Received unexpected event from api {event:?}")
                }
            }
        }
    });

    Ok(())
}


extern "C" fn on_exit() {
    println!("Application exited.\nClosing `api` sidecar...");

    let response = std::process::Command::new("curl")
        .args(vec!["-X", "POST", "http://localhost:8008/api/v1/shutdown"])
        .output()
        .unwrap()
        .stdout;
    let response = str::from_utf8(&response).unwrap();

    println!("Server shutdown : {response}");
}

fn register_exit_handling() -> anyhow::Result<()> {
    unsafe {
        libc::atexit(on_exit);
    }
    let mut signals = Signals::new([SIGTERM])?;

    thread::spawn(move || {
        for _sig in signals.forever() {
            on_exit();
        }
    });

    Ok(())
}

fn main() -> anyhow::Result<()> {
    register_exit_handling()?;

    tauri::Builder::default()
        .menu(create_app_menu())
        .on_menu_event(on_menu_event)
        .manage(Mutex::new(ErrorsState::default()))
        .setup(move |app| {
            let window = app.get_window("main").expect("No window labelled `main`");

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            let (tx, rx) = channel::<BackendEvent>();

            if let Err(err) = start_backend(tx) {
                println!("Failed to start backend: {err}");
                window.emit_error(ErrorPayload::new().with_title("Failed to start backend").with_message(err.to_string()))?;
            }

            tauri::async_runtime::spawn(async move {
                while let Some(event) = rx.recv().ok() {
                    match event {
                        BackendEvent::PortAlreadyInUseError => window.emit_error(ErrorPayload::new().with_title("Failed to start backend").with_message("Port already in use")).unwrap()
                    }
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_finder,
            open_powerpoint,
            ready_to_receive_errors
        ])
        .run(tauri::generate_context!())
        .context("Error while running app")
}

