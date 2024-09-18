use crate::AppState;
use std::process::Command;

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
pub fn get_backend_error(state: tauri::State<AppState>) -> Option<String> {
    let backend_error = state.backend_error.lock().unwrap();
    backend_error.clone()
}
