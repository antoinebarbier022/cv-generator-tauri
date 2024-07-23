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
                .add_item(CustomMenuItem::new("preferences_app", "Preferences...").disabled())
                .add_native_item(MenuItem::Separator)
                .add_item(CustomMenuItem::new("update_app", "Check for Updates...").disabled())
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
                .add_item(CustomMenuItem::new("file.export", "Export").disabled())
                .add_item(CustomMenuItem::new("file.import", "Import").disabled())
                .add_native_item(MenuItem::Separator)
                .add_item(CustomMenuItem::new("file.reset", "Reset all"))
                .add_native_item(MenuItem::Separator)
                .add_item(
                    CustomMenuItem::new("file.generate", "Generate and save")
                        .accelerator("Cmd+G")
                        .disabled(),
                )
                .add_item(
                    CustomMenuItem::new("file.generate-and-save-as", "Generate and save as...")
                        .accelerator("Cmd+Shift+G"),
                ),
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
            Menu::new()
                .add_item(
                    CustomMenuItem::new("debug.open-panel", "Open debug panel")
                        .accelerator("Cmd+Shift+D"),
                )
                .add_item(
                    CustomMenuItem::new("debug.developer-tools", "Developer Tools")
                        .accelerator("Option+Cmd+I"),
                ),
        ))
        .add_submenu(Submenu::new(
            "Help",
            Menu::new().add_item(CustomMenuItem::new("help.open-url-slack", "Canal Slack")),
        ));
}

fn main() {
    tauri::Builder::default()
        .menu(create_app_menu())
        .on_menu_event(|event| {
            if event.menu_item_id() == "help.open-url-slack" {
                open(
                    &event.window().shell_scope(),
                    "https://capgemini.enterprise.slack.com/archives/C07DCNBUT4Z",
                    None,
                )
                .unwrap();
            }
            if event.menu_item_id() == "debug.open-panel" {
                event.window().emit("debug-open-panel", "").unwrap();
            }
            if event.menu_item_id() == "debug.developer-tools" {
                if event.window().is_devtools_open() {
                    event.window().close_devtools();
                } else {
                    event.window().open_devtools();
                }
            }
            if event.menu_item_id() == "file.export" {
                event.window().emit("file-export", "").unwrap();
            }
            if event.menu_item_id() == "file.import" {
                event.window().emit("file-import", "").unwrap();
            }
            if event.menu_item_id() == "file.reset" {
                event.window().emit("file-reset", "").unwrap();
            }
            if event.menu_item_id() == "file.generate" {
                event.window().emit("file-generate", "").unwrap();
            }
            if event.menu_item_id() == "file.generate-and-save-as" {
                event
                    .window()
                    .emit("file-generate-and-save-as", "")
                    .unwrap();
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
