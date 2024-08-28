use strum::{EnumString, IntoStaticStr};
use tauri::AboutMetadata;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

#[derive(IntoStaticStr, EnumString, PartialEq, Debug)]
pub(crate) enum MyMenu {
    FileExport,
    FileImport,
    FileReset,
    FileGenerate,
    FileGenerateAndSaveAs,

    AppPreferences,
    AppUpdate,

    DebugOpenPanel,
    DebugSendError,

    HelpOpenSlack,
}

impl Into<String> for MyMenu {
    fn into(self) -> String {
        <&MyMenu as Into<&str>>::into(&self).to_string()
    }
}

pub fn create_app_menu() -> Menu {
    Menu::new()
        .add_submenu(app_menu())
        .add_submenu(file_menu())
        .add_submenu(edit_menu())
        .add_submenu(window_menu())
        .add_submenu(debug_menu())
        .add_submenu(help_menu())
}

fn help_menu() -> Submenu {
    Submenu::new(
        "Help",
        Menu::new().add_item(CustomMenuItem::new(MyMenu::HelpOpenSlack, "Canal Slack")),
    )
}

fn app_menu() -> Submenu {
    Submenu::new(
        "App",
        Menu::new()
            .add_native_item(MenuItem::About(
                "CV generator".into(),
                AboutMetadata::default(),
            ))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new(MyMenu::AppPreferences, "Preferences...").disabled())
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new(MyMenu::AppUpdate, "Check for Updates...").disabled())
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Services)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::HideOthers)
            .add_native_item(MenuItem::ShowAll)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
    )
}

fn edit_menu() -> Submenu {
    Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll),
    )
}

fn debug_menu() -> Submenu {
    Submenu::new(
        "Debug",
        Menu::new().add_item(
            CustomMenuItem::new(MyMenu::DebugOpenPanel, "Open debug panel")
                .accelerator("Cmd+Shift+D"),
        ).add_item(
            CustomMenuItem::new(MyMenu::DebugSendError, "Send an error")
        ),
    )
}

fn window_menu() -> Submenu {
    Submenu::new(
        "Window",
        Menu::new()
            .add_native_item(MenuItem::EnterFullScreen)
            .add_native_item(MenuItem::Minimize)
            .add_native_item(MenuItem::Zoom),
    )
}


fn file_menu() -> Submenu {
    Submenu::new(
        "File",
        Menu::new()
            .add_item(CustomMenuItem::new(MyMenu::FileExport, "Export").disabled())
            .add_item(CustomMenuItem::new(MyMenu::FileImport, "Import"))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new(MyMenu::FileReset, "Reset all"))
            .add_native_item(MenuItem::Separator)
            .add_item(
                CustomMenuItem::new(MyMenu::FileGenerate, "Generate and save")
                    .accelerator("Cmd+G")
                    .disabled(),
            )
            .add_item(
                CustomMenuItem::new(MyMenu::FileGenerateAndSaveAs, "Generate and save as...")
                    .accelerator("Cmd+Shift+G"),
            ),
    )
}
