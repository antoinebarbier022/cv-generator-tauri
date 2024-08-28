use tauri::AboutMetadata;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub fn create_app_menu() -> Menu {
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
                .add_item(CustomMenuItem::new("file.import", "Import"))
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
            Menu::new().add_item(
                CustomMenuItem::new("debug.open-panel", "Open debug panel")
                    .accelerator("Cmd+Shift+D"),
            ),
        ))
        .add_submenu(Submenu::new(
            "Help",
            Menu::new().add_item(CustomMenuItem::new("help.open-url-slack", "Canal Slack")),
        ));
}
