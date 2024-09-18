use crate::errors::{EmitError, ErrorPayload};
use convert_case::{Case, Casing};
use std::str::FromStr;
use strum::{EnumString, IntoStaticStr};
use tauri::menu::{
    AboutMetadataBuilder, Menu, MenuBuilder, MenuId, MenuItemBuilder, Submenu, SubmenuBuilder,
};
use tauri::{AppHandle, Emitter, Runtime};
use tauri_plugin_shell::ShellExt;
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

impl Into<MenuId> for MyMenu {
    fn into(self) -> MenuId {
        MenuId(self.into())
    }
}
impl TryFrom<&MenuId> for MyMenu {
    type Error = strum::ParseError;

    fn try_from(value: &MenuId) -> Result<Self, Self::Error> {
        MyMenu::from_str(value.0.as_str())
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

pub fn on_menu_event(app: &AppHandle, event: tauri::menu::MenuEvent) {
    match MyMenu::try_from(event.id()).ok() {
        Some(MyMenu::FileImport) => app
            .emit(&MenuEvent::FileImport.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::FileExport) => app
            .emit(&MenuEvent::FileExport.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::FileReset) => app.emit(&MenuEvent::FileReset.as_event_name(), "").unwrap(),
        Some(MyMenu::FileGenerate) => app
            .emit(&MenuEvent::FileGenerate.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::FileGenerateAndSaveAs) => app
            .emit(&MenuEvent::FileGenerateAndSaveAs.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::AppPreferences) => app
            .emit(&MenuEvent::AppPreferences.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::AppCheckUpdate) => app
            .emit(
                &MenuEvent::AppCheckUpdate.as_event_name(),
                "check-update-from-menu",
            )
            .unwrap(),
        Some(MyMenu::ViewToggleSidebar) => app
            .emit(&MenuEvent::ViewToggleSidebar.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::DebugOpenPanel) => app
            .emit(&MenuEvent::DebugOpenPanel.as_event_name(), "")
            .unwrap(),
        Some(MyMenu::DebugSendError) => app
            .emit_error(
                ErrorPayload::new()
                    .with_title("Ceci est un titre")
                    .with_message("Ceci est un message"),
            )
            .unwrap(),
        Some(MyMenu::HelpOpenSlack) => {
            if let Err(err) = app.shell().open(
                "https://capgemini.enterprise.slack.com/archives/C07DCNBUT4Z",
                None,
            ) {
                app.emit_error(
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

pub fn create_app_menu<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<Menu<R>> {
    MenuBuilder::new(app)
        .item(&app_menu(app)?)
        .item(&file_menu(app)?)
        .item(&edit_menu(app)?)
        .item(&view_menu(app)?)
        .item(&window_menu(app)?)
        .item(&debug_menu(app)?)
        .item(&help_menu(app)?)
        .build()
}

fn help_menu<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<Submenu<R>> {
    SubmenuBuilder::new(app, "Help")
        .item(&MenuItemBuilder::with_id(MyMenu::HelpOpenSlack, "Canal Slack").build(app)?)
        .build()
}

fn app_menu<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<Submenu<R>> {
    SubmenuBuilder::new(app, "App")
        .about(Some(
            AboutMetadataBuilder::default()
                .name("CV generator".into())
                .build(),
        ))
        .separator()
        .item(
            &MenuItemBuilder::with_id(MyMenu::AppPreferences, "Preferences...")
                .accelerator("Cmd+,")
                .build(app)?,
        )
        .separator()
        .item(&MenuItemBuilder::with_id(MyMenu::AppCheckUpdate, "Check for Updates...").build(app)?)
        .separator()
        .services()
        .separator()
        .hide()
        .hide_others()
        .show_all()
        .separator()
        .quit()
        .build()
}

fn edit_menu<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<Submenu<R>> {
    SubmenuBuilder::new(app, "Edit")
        .undo()
        .redo()
        .separator()
        .cut()
        .copy()
        .paste()
        .select_all()
        .build()
}

fn debug_menu<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<Submenu<R>> {
    SubmenuBuilder::new(app, "Debug")
        .item(
            &MenuItemBuilder::with_id(MyMenu::DebugOpenPanel, "Open debug panel")
                .accelerator("Cmd+Shift+D")
                .build(app)?,
        )
        .item(&MenuItemBuilder::with_id(MyMenu::DebugSendError, "Send an error").build(app)?)
        .build()
}

fn view_menu<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<Submenu<R>> {
    SubmenuBuilder::new(app, "View")
        .item(
            &MenuItemBuilder::with_id(MyMenu::ViewToggleSidebar, "Toggle Sidebar")
                .accelerator("Cmd+S")
                .build(app)?,
        )
        .build()
}

fn window_menu<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<Submenu<R>> {
    SubmenuBuilder::new(app, "Window")
        .fullscreen()
        .minimize()
        .build()
}

fn file_menu<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<Submenu<R>> {
    SubmenuBuilder::new(app, "File")
        .item(
            &MenuItemBuilder::with_id(MyMenu::FileExport, "Export")
                .enabled(false)
                .build(app)?,
        )
        .item(&MenuItemBuilder::with_id(MyMenu::FileImport, "Import").build(app)?)
        .separator()
        .item(&MenuItemBuilder::with_id(MyMenu::FileReset, "Reset all").build(app)?)
        .separator()
        .item(
            &MenuItemBuilder::with_id(MyMenu::FileGenerate, "Generate and save")
                .accelerator("Cmd+G")
                .enabled(false)
                .build(app)?,
        )
        .item(
            &MenuItemBuilder::with_id(MyMenu::FileGenerateAndSaveAs, "Generate and save as...")
                .accelerator("Cmd+Shift+G")
                .build(app)?,
        )
        .build()
}
