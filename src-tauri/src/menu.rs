use crate::errors::{EmitError, ErrorPayload};
use convert_case::{Case, Casing};
use strum::{EnumString, IntoStaticStr};
use tauri::api::shell::open;
use tauri::{AboutMetadata, Manager, WindowMenuEvent};
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
use ts_const_enums::TsConstEnum;
use ts_rs::TS;

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

impl From<MyMenu> for String {
    fn from(value: MyMenu) -> Self {
        <&MyMenu as Into<&str>>::into(&value).to_string()
    }
}

#[derive(IntoStaticStr, TsConstEnum)]
#[ts(export_to = "events/menu-events.ts")]
enum MenuEvent {
    FileExport,
    FileImport,
    FileReset,
    FileGenerate,
    FileGenerateAndSaveAs,

    DebugOpenPanel,
    AppPreferences,
}

impl MenuEvent {
    fn as_event_name(&self) -> String {
        <&Self as Into<&str>>::into(self).to_case(Case::Kebab)
    }
}

pub fn on_menu_event(event: WindowMenuEvent) {
    match MyMenu::try_from(event.menu_item_id()).ok() {
        Some(MyMenu::FileImport) => event
            .window()
            .emit(&MenuEvent::FileImport.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::FileExport) => event
            .window()
            .emit(&MenuEvent::FileExport.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::FileReset) => event
            .window()
            .emit(&MenuEvent::FileReset.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::FileGenerate) => event
            .window()
            .emit(&MenuEvent::FileGenerate.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::FileGenerateAndSaveAs) => event
            .window()
            .emit(&MenuEvent::FileGenerateAndSaveAs.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::AppPreferences) => event
            .window()
            .emit(&MenuEvent::AppPreferences.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::AppUpdate) => {
            todo!()
        }
        Some(MyMenu::DebugOpenPanel) => event
            .window()
            .emit(&MenuEvent::DebugOpenPanel.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::DebugSendError) => event
            .window()
            .emit_error(
                ErrorPayload::new()
                    .with_title("Ceci est un titre")
                    .with_message("Ceci est un message"),
            )
            .unwrap(),
        Some(MyMenu::HelpOpenSlack) => {
            if let Err(err) = open(
                &event.window().shell_scope(),
                "https://capgemini.enterprise.slack.com/archives/C07DCNBUT4Z",
                None,
            ) {
                event
                    .window()
                    .emit_error(
                        ErrorPayload::new()
                            .with_title("Failed to open Slack channel")
                            .with_message(err.to_string()),
                    )
                    .unwrap();
            }
        }
        None => { /* do nothing */ }
    };
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
            .add_item(
                CustomMenuItem::new(MyMenu::AppPreferences, "Preferences...").accelerator("Cmd+,"),
            )
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
        Menu::new()
            .add_item(
                CustomMenuItem::new(MyMenu::DebugOpenPanel, "Open debug panel")
                    .accelerator("Cmd+Shift+D"),
            )
            .add_item(CustomMenuItem::new(MyMenu::DebugSendError, "Send an error")),
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
