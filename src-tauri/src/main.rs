#![feature(try_blocks)]
#![feature(let_chains)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod errors;
mod menu;
use crate::commands::{get_backend_error, open_finder, open_powerpoint};
use crate::menu::{create_app_menu, on_menu_event};
use anyhow::Context;
use core::str;
use libc::SIGTERM;
use serde::Serialize;
use signal_hook::iterator::Signals;
use std::sync::Mutex;
use std::thread;
use tauri::api::process::{Command, CommandEvent, TerminatedPayload};
use tauri::Manager;
use window_vibrancy::*;

fn start_backend() -> anyhow::Result<()> {
    println!("Spawning api server...");
    spawn_backend()?;

    Ok(())
}

fn spawn_backend() -> anyhow::Result<()> {
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

                    if !infos.trim().is_empty() {
                        println!("Api terminated.")
                    } else {
                        println!("Api terminated with {infos}.")
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

#[derive(Default, Debug, Serialize)]
struct AppState {
    pub backend_error: Mutex<Option<String>>,
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
        .manage(AppState::default())
        .menu(create_app_menu())
        .on_menu_event(on_menu_event)
        .setup(move |app| {
            let window = app.get_window("main").expect("No window labelled `main`");

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            if let Err(err) = start_backend() {
                println!("Failed to start backend: {err}");
                *app.state::<AppState>().backend_error.lock().unwrap() = Some(err.to_string());
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_finder,
            open_powerpoint,
            get_backend_error
        ])
        .run(tauri::generate_context!())
        .context("Error while running app")
}

