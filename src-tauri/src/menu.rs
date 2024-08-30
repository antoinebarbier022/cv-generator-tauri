use crate::errors::{EmitError, ErrorPayload};
use convert_case::{Case, Casing};
use strum::{EnumIter, EnumString, IntoEnumIterator, IntoStaticStr};
use tauri::api::shell::open;
use tauri::{AboutMetadata, Manager, WindowMenuEvent};
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
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

#[derive(IntoStaticStr, EnumIter)]
enum MenuEvent {
    FileExport,
    FileImport,
    FileReset,
    FileGenerate,
    FileGenerateAndSaveAs,

    DebugOpenPanel,
}

impl MenuEvent {
    fn as_event_name(&self) -> String {
        <&Self as Into<&str>>::into(self).to_case(Case::Kebab)
    }
}

impl TS for MenuEvent {
    type WithoutGenerics = Self;
    fn ident() -> String { "MenuEvent".to_owned() }
    fn decl() -> String {
        let inline = <Self as TS>::inline();
        let generics = "";
        format!("enum {}{generics} {inline}", "MenuEvent", generics = generics, inline = inline)
    }
    fn decl_concrete() -> String {
        format!("enum {} = {}", "MenuEvent", <Self as TS>::inline())
    }
    fn name() -> String { "MenuEvent".to_owned() }
    fn inline() -> String {
        let body = Self::iter().map(|variant| {
            let value = variant.as_event_name();
            let name: &'static str = variant.into();

            format!(r#"  {name} = "{value}","#, )
        }).collect::<Vec<_>>().join("\n");

        format!("{{\n{body}\n}}")
    }
    fn inline_flattened() -> String {
        Self::inline()
    }
    fn output_path() -> Option<&'static std::path::Path> { Some(std::path::Path::new("events/menu-events.ts")) }
}

#[cfg(test)]
#[test]
fn export_bindings_menuevent() { <MenuEvent as TS>::export_all().expect("could not export type"); }


pub fn on_menu_event(event: WindowMenuEvent) {
    match MyMenu::try_from(event.menu_item_id()).ok() {
        Some(MyMenu::FileImport) => event.window().emit(&MenuEvent::FileImport.as_event_name(), "").unwrap(),
        Some(MyMenu::FileExport) => event.window().emit(&MenuEvent::FileExport.as_event_name(), "").unwrap(),
        Some(MyMenu::FileReset) => event.window().emit(&MenuEvent::FileReset.as_event_name(), "").unwrap(),
        Some(MyMenu::FileGenerate) => event.window().emit(&MenuEvent::FileGenerate.as_event_name(), "").unwrap(),
        Some(MyMenu::FileGenerateAndSaveAs) => event
            .window()
            .emit(&MenuEvent::FileGenerateAndSaveAs.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::AppPreferences) => {
            todo!()
        }
        Some(MyMenu::AppUpdate) => {
            todo!()
        }
        Some(MyMenu::DebugOpenPanel) => {
            event.window().emit(&MenuEvent::DebugOpenPanel.as_event_name(), "").unwrap()
        }
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
