// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::shell::open;
use tauri::{AboutMetadata, Manager};
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
use window_vibrancy::*;

fn create_app_menu() -> Menu {
    return Menu::new()
        .add_submenu(Submenu::new(
            "App",
            Menu::new()
                .add_native_item(MenuItem::About(
                    "CV generator".into(),
                    AboutMetadata::default(),
                ))
                .add_native_item(MenuItem::Separator)
                .add_item(
                    CustomMenuItem::new("preferences_app".to_string(), "Preferences...").disabled(),
                )
                .add_item(
                    CustomMenuItem::new("share_app".to_string(), "Share CV Generator").disabled(),
                )
                .add_native_item(MenuItem::Separator)
                .add_item(
                    CustomMenuItem::new("update_app".to_string(), "Check for Updates...")
                        .disabled(),
                )
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Services)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Hide)
                .add_native_item(MenuItem::HideOthers)
                .add_native_item(MenuItem::ShowAll)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Quit),
        ))
        .add_submenu(Submenu::new(
            "File",
            Menu::new()
                .add_item(CustomMenuItem::new("file.export".to_string(), "Export JSON").disabled())
                .add_native_item(MenuItem::Separator)
                .add_item(CustomMenuItem::new("file.generate".to_string(), "Generate CV").disabled()),
        ))
        .add_submenu(Submenu::new(
            "Edit",
            Menu::new()
                .add_native_item(MenuItem::Undo)
                .add_native_item(MenuItem::Redo)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Cut)
                .add_native_item(MenuItem::Copy)
                .add_native_item(MenuItem::Paste)
                .add_native_item(MenuItem::SelectAll),
        ))
        .add_submenu(Submenu::new(
            "Window",
            Menu::new()
                .add_native_item(MenuItem::EnterFullScreen)
                .add_native_item(MenuItem::Minimize)
                .add_native_item(MenuItem::Zoom),
        ))
        .add_submenu(Submenu::new(
            "Debug",
            Menu::new().add_item(CustomMenuItem::new(
                "debug-open-panel".to_string(),
                "Open debug panel",
            ).accelerator("Cmd+Shift+D")),
        ))
        .add_submenu(Submenu::new(
            "Help",
            Menu::new().add_item(CustomMenuItem::new("help-slack-open-url".to_string(), "Canal Slack")),
        ));
}

fn main() {
    tauri::Builder::default()
        .menu(create_app_menu())
        .on_menu_event(|event| {
            if event.menu_item_id() == "help-slack-open-url" { 
                open(&event.window().shell_scope(), "https://capgemini.enterprise.slack.com/archives/C07DCNBUT4Z", None).unwrap();
            }
            if event.menu_item_id() == "debug-open-panel" {
                event.window().emit("navigate-to-debug-panel", "").unwrap();
            }
        })
        
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            Ok(())
        })
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
