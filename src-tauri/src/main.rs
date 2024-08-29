#![feature(try_blocks)]
#![feature(let_chains)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod errors;
mod commands;
mod menu;

use std::sync::mpsc::{channel, RecvError, Sender};
use std::sync::Mutex;
use std::thread;
use tauri::api::process::{Command, CommandChild};
use tauri::api::shell::open;
use tauri::{Manager, WindowEvent};
use window_vibrancy::*;
use crate::commands::{get_backend_error, open_finder, open_powerpoint};
use crate::menu::{create_app_menu, MyMenu};
use crate::errors::{EmitError, ErrorPayload};
use anyhow::Context;
use serde::Serialize;

/// Start the api server
/// Returns a channel Sender used to trigger the process kill
fn start_backend() -> Result<Sender<()>, anyhow::Error> {
    let (tx_kill, rx_kill) = channel();

    let child = spawn_backend()?;

    thread::spawn(move || {
        match rx_kill.recv() {
            Ok(()) => println!("Received kill signal!"),
            Err(RecvError) => println!("Kill channel was closed!"),
        }
        println!("Closing `api` sidecar...");
        child.kill().expect("killing api server process.");
    });

    Ok(tx_kill)
}

fn spawn_backend() -> anyhow::Result<CommandChild> {
    Command::new_sidecar("api")
        .context("Failed to create `api` binary command")?
        .spawn()
        .context("Failed to spawn `api` sidecar")
        .map(|(_, child)| child)
}

#[derive(Default, Debug, Serialize)]
struct AppState {
    pub backend_error: Mutex<Option<String>>
}

fn main() -> tauri::Result<()> {
    tauri::Builder::default()
        .manage(AppState::default())
        .menu(create_app_menu())
        .on_menu_event(|event| {
            match MyMenu::try_from(event.menu_item_id()).ok() {
                Some(MyMenu::FileImport) => event.window().emit("file-import", "").unwrap(),
                Some(MyMenu::FileExport) => event.window().emit("file-export", "").unwrap(),
                Some(MyMenu::FileReset) => event.window().emit("file-reset", "").unwrap(),
                Some(MyMenu::FileGenerate) => event.window().emit("file-generate", "").unwrap(),
                Some(MyMenu::FileGenerateAndSaveAs) => event.window().emit("file-generate-and-save-as", "").unwrap(),
                Some(MyMenu::AppPreferences) => { todo!() }
                Some(MyMenu::AppUpdate) => { todo!() }
                Some(MyMenu::DebugOpenPanel) => event.window().emit("debug-open-panel", "").unwrap(),
                Some(MyMenu::DebugSendError) => event.window().emit_error(
                    ErrorPayload::new()
                        .with_title("Ceci est un titre")
                        .with_message("Ceci est un message")
                ).unwrap(),
                Some(MyMenu::HelpOpenSlack) => if let Err(err) = open(
                    &event.window().shell_scope(),
                    "https://capgemini.enterprise.slack.com/archives/C07DCNBUT4Z",
                    None,
                ) {
                    event.window().emit_error(ErrorPayload::new().with_title("Failed to open Slack channel").with_message(err.to_string())).unwrap();
                },
                None => { /* do nothing */ }
            };
        })
        .setup(move |app| {
            let window = app.get_window("main").expect("No window labelled `main`");

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            let tx_kill= match start_backend() {
                Ok(tx_kill) => {
                    *app.state::<AppState>().backend_error.lock().unwrap() = None;
                    Some(tx_kill)
                },
                Err(err) => {
                    println!("Failed to start backend: {err}");
                    *app.state::<AppState>().backend_error.lock().unwrap() = Some(err.to_string());
                    None
                }
            };

            window.on_window_event(move |event| {
                if let WindowEvent::Destroyed = event && let Some(tx_kill) = &tx_kill {
                    println!("[Event] App closed, shutting down API...");
                    tx_kill.send(()).expect("Failed to send kill signal");
                }
            });

            Ok(())
        })
        // Tell the child process to shutdown when app exits
        .invoke_handler(tauri::generate_handler![open_finder, open_powerpoint, get_backend_error])
        .run(tauri::generate_context!())
}
