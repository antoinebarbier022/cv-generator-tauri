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
            .args(&[&path])
            .spawn()
            .expect("Impossible d'ouvrir le fichier PowerPoint");
    } else {
        println!("Cette commande est destinée à être utilisée sur macOS.");
    }
}
