#![feature(try_blocks)]
#![feature(let_chains)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod errors;
mod menu;
use crate::commands::{get_backend_error, open_finder, open_powerpoint};
use crate::errors::{EmitError, ErrorPayload};
use crate::menu::{create_app_menu, on_menu_event};
use anyhow::Context;
use core::str;
use lazy_static::lazy_static;
use libc::SIGTERM;
use serde::Serialize;
use signal_hook::iterator::Signals;
use std::net::TcpListener;
use std::ops::Deref;
use std::sync::Mutex;
use std::{sync, thread};
use sync::mpsc::{channel, Sender};
use tauri::{AppHandle, Manager};
use tauri_plugin_shell::process::{CommandEvent, TerminatedPayload};
use tauri_plugin_shell::ShellExt;
use window_vibrancy::*;

const DEFAULT_BACKEND_PORT: u16 = 8008;

fn find_free_port() -> String {
    let listener = TcpListener::bind("127.0.0.1:0").ok();
    let port = listener
        .and_then(|listener| listener.local_addr().ok())
        .map(|addr| addr.port())
        .unwrap_or(DEFAULT_BACKEND_PORT);
    port.to_string()
}

fn start_backend(app: &AppHandle, tx: Sender<BackendEvent>) -> anyhow::Result<()> {
    println!("Spawning api server...");
    spawn_backend(app, tx)?;

    Ok(())
}

enum BackendEvent {
    PortAlreadyInUseError,
}

lazy_static! {
    static ref BACKEND_PORT: String = find_free_port();
}

#[tauri::command]
fn get_backend_port() -> &'static str {
    &BACKEND_PORT
}

fn spawn_backend(app: &AppHandle, tx: Sender<BackendEvent>) -> anyhow::Result<()> {
    let (mut rx, _) = app
        .shell()
        .sidecar("cv-generator-api")
        .context("Failed to create `api` binary command")?
        .args(["--port", &BACKEND_PORT])
        .spawn()
        .context("Failed to spawn `api` sidecar")?;

    tauri::async_runtime::spawn(async move {
        while let Some(event) = rx.recv().await {
            match event {
                CommandEvent::Stderr(line) => {
                    print!("[API-LOG]: {}", String::from_utf8_lossy(&line))
                }
                CommandEvent::Stdout(line) => print!("[API]: {}", String::from_utf8_lossy(&line)),
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

#[derive(Default, Debug, Serialize)]
struct AppState {
    pub backend_error: Mutex<Option<String>>,
}

extern "C" fn on_exit() {
    println!("Application exited.\nClosing `api` sidecar...");

    let response = std::process::Command::new("curl")
        .args(vec![
            "-X",
            "POST",
            &format!("http://localhost:{}/api/v1/shutdown", BACKEND_PORT.deref()),
        ])
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
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .manage(AppState::default())
        .menu(create_app_menu)
        .setup(move |app| {
            app.on_menu_event(on_menu_event);

            let window = app
                .get_webview_window("main")
                .expect("No window labelled `main`");

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            let (tx, rx) = channel::<BackendEvent>();

            if let Err(err) = start_backend(app.handle(), tx) {
                println!("Failed to start backend: {err}");
                *app.state::<AppState>().backend_error.lock().unwrap() = Some(err.to_string());
            }

            tauri::async_runtime::spawn(async move {
                while let Some(event) = rx.recv().ok() {
                    match event {
                        BackendEvent::PortAlreadyInUseError => window
                            .emit_error(
                                ErrorPayload::new()
                                    .with_title("Failed to start backend")
                                    .with_message("Port already in use"),
                            )
                            .unwrap(),
                    }
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_finder,
            open_powerpoint,
            get_backend_error,
            get_backend_port
        ])
        .run(tauri::generate_context!())
        .context("Error while running app")
}
