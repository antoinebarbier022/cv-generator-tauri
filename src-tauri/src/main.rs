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
use tauri::api::process::{Command, CommandEvent, TerminatedPayload};
use tauri::menu::MenuItemBuilder;
use tauri::menu::{MenuBuilder, SubmenuBuilder};
use tauri::Manager;
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

fn start_backend(tx: Sender<BackendEvent>) -> anyhow::Result<()> {
    println!("Spawning api server...");
    spawn_backend(tx)?;

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

fn spawn_backend(tx: Sender<BackendEvent>) -> anyhow::Result<()> {
    let (mut rx, _) = Command::new_sidecar("cv-generator-api")
        .context("Failed to create `api` binary command")?
        .args(["--port", &BACKEND_PORT])
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
        .manage(AppState::default())
        //.menu(create_app_menu())
        //.on_menu_event(on_menu_event)
        .setup(move |app| {
            let edit_menu = SubmenuBuilder::new(app, "Edit")
                .undo()
                .redo()
                .separator()
                .cut()
                .copy()
                .paste()
                .select_all()
                .build()?;

            let debug_menu = SubmenuBuilder::new(app, "Debug")
                .item(
                    &MenuItemBuilder::with_id(MyMenu::DebugOpenPanel, "Open debug panel")
                        .accelerator("Cmd+Shift+D"),
                )
                .item(&MenuItemBuilder::with_id(
                    MyMenu::DebugSendError,
                    "Send an error",
                ))
                .build()?;

            let view_menu = SubmenuBuilder::new(app, "View")
                .item(
                    &MenuItem::new(MyMenu::ViewToggleSidebar, "Toggle Sidebar")
                        .accelerator("Cmd+S"),
                )
                .build()?;

            let menu = MenuBuilder::new(app)
                .item(&edit_menu)
                .item(&debug_menu)
                .build()?;

            app.set_menu(menu)?;

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

            if let Err(err) = start_backend(tx) {
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
