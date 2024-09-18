use crate::errors::{EmitError, ErrorPayload};
use convert_case::{Case, Casing};
use strum::{EnumString, IntoStaticStr};
use tauri::api::shell::open;
use tauri::menu::{Menu, MenuBuilder};
use tauri::{AboutMetadata, AppHandle, Manager, WindowMenuEvent};
use tauri::{MenuItemBuilder, MenuItem, Submenu};
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
    AppCheckUpdate,

    DebugOpenPanel,
    DebugSendError,

    ViewToggleSidebar,

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
    AppCheckUpdate,

    ViewToggleSidebar,
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
        Some(MyMenu::AppCheckUpdate) => event
            .window()
            .emit(
                &MenuEvent::AppCheckUpdate.as_event_name(),
                "check-update-from-menu",
            )
            .unwrap(),
        Some(MyMenu::ViewToggleSidebar) => event
            .window()
            .emit(&MenuEvent::ViewToggleSidebar.as_event_name(), "")
            .unwrap(),
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

pub fn create_app_menu<R: tauri::Runtime>(app: &'_ AppHandle) -> tauri::Result<Menu<R>> {
    MenuBuilder::new(app)
        .item(&app_menu())
        .item(&file_menu())
        .item(&edit_menu())
        .item(&view_menu())
        .item(&window_menu())
        .item(&debug_menu())
        .item(&help_menu())
}

fn help_menu() -> Submenu {
    SubmenuBuilder::new(app, "Help")
        .add_item(MenuItemBuilder::new(MyMenu::HelpOpenSlack, "Canal Slack")).build()?;
    
}

fn app_menu() -> Submenu {
    SubmenuBuilder::new(app, "App")
    
            .about(
                "CV generator".into(),
                AboutMetadata::default(),
            )
            .separator()
            .add_item(
                MenuItemBuilder::new(MyMenu::AppPreferences, "Preferences...").accelerator("Cmd+,"),
            )
            .separator()
            .add_item(MenuItemBuilder::new(
                MyMenu::AppCheckUpdate,
                "Check for Updates...",
            ))
            .separator()
            .services()
            .separator()
            .hide()
            .hide_others()
            .show_all()
            .separator()
            .quit()
            .build()?;
    
}



fn debug_menu() -> Submenu {
    SubmenuBuilder::new(app, "Debug")
       
            .add_item(
                MenuItemBuilder::new(MyMenu::DebugOpenPanel, "Open debug panel")
                    .accelerator("Cmd+Shift+D"),
            )
            .add_item(MenuItemBuilder::new(MyMenu::DebugSendError, "Send an error")),
    
}

fn view_menu() -> Submenu {
    SubmenuBuilder::new(app, "View")
        .item(
            &MenuItem::new(MyMenu::ViewToggleSidebar, "Toggle Sidebar").accelerator("Cmd+S"),
        
    )
}

fn window_menu() -> Submenu {
    SubmenuBuilder::new(app, "Window")
        
            .fullscreen()
            .maximize()
            .minimize()
            .add_native_item(MenuItem::Zoom)
            .build()?;
    
}

fn file_menu() -> Submenu {
    SubmenuBuilder::new(app, "File")
    
            .add_item(MenuItemBuilder::new(MyMenu::FileExport, "Export").disabled())
            .add_item(MenuItemBuilder::new(MyMenu::FileImport, "Import"))
            .separator()
            .add_item(MenuItemBuilder::new(MyMenu::FileReset, "Reset all"))
            .separator()
            .add_item(
                MenuItemBuilder::new(MyMenu::FileGenerate, "Generate and save")
                    .accelerator("Cmd+G")
                    .disabled(),
            )
            .add_item(
                MenuItemBuilder::new(MyMenu::FileGenerateAndSaveAs, "Generate and save as...")
                    .accelerator("Cmd+Shift+G"),
            )
    
}
