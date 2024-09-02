use std::process::Command;
use std::sync::Mutex;
use tauri::Window;
use crate::errors::{ErrorsState};

#[tauri::command]
pub fn open_finder(path: String) {
    println!("Open finder");
    Command::new("open").args(["-R", &path]).spawn().unwrap();
}

#[tauri::command]
pub fn open_powerpoint(path: String) {
    if cfg!(target_os = "macos") {
        Command::new("open")
            .arg(path)
            .spawn()
            .expect("Impossible d'ouvrir le fichier PowerPoint");
    } else {
        println!("Cette commande est destinée à être utilisée sur macOS.");
    }
}

#[tauri::command]
pub fn ready_to_receive_errors(window: Window, state: tauri::State<Mutex<ErrorsState>>) {
    let mut state = state.lock().unwrap();
    state.ready_to_send_errors = true;
    state.pop_errors(&window);
}