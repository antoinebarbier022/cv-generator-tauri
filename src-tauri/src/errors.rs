use std::sync::Mutex;
use serde::Serialize;
use tauri::{Manager, Window};
use ts_rs::TS;

const ERROR_EVENT: &'static str = "error";

#[derive(Clone, Serialize, Debug, Default, TS)]
#[ts(
    export,
    rename = "ErrorContent",
    export_to = "errors/types/errors.d.ts"
)]
pub struct ErrorPayload {
    pub title: Option<String>,
    pub message: Option<String>,
}

impl ErrorPayload {
    pub(crate) fn new() -> Self {
        Self::default()
    }

    pub(crate) fn with_title(mut self, title: impl Into<String>) -> Self {
        self.title = Some(title.into());
        self
    }

    pub(crate) fn with_message(mut self, message: impl Into<String>) -> Self {
        self.message = Some(message.into());
        self
    }
}

#[derive(Default, Debug, Serialize)]
pub struct ErrorsState {
    pub buffered_errors: Vec<ErrorPayload>,
    pub ready_to_send_errors: bool
}

impl ErrorsState {
    fn push_error(&mut self, window: &Window, error: ErrorPayload) -> anyhow::Result<()> {
        if self.ready_to_send_errors {
            window.emit(ERROR_EVENT, error)?;
        } else {
            self.buffered_errors.push(error);
        }

        Ok(())
    }

    pub(crate) fn pop_errors(&mut self, window: &Window) {
        while let Some(err) = self.buffered_errors.pop() {
            println!("test");
            window.emit(ERROR_EVENT, err).unwrap();
        }
    }
}

pub(crate) trait EmitError {
    fn emit_error(&self, error: ErrorPayload) -> anyhow::Result<()>;
}

impl EmitError for Window {
    fn emit_error(&self, error: ErrorPayload) -> anyhow::Result<()> {
        self.state::<Mutex<ErrorsState>>().lock().unwrap().push_error(self, error)
    }
}