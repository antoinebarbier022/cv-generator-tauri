use serde::Serialize;
use tauri::{Result, Runtime, Window};
use ts_rs::TS;

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

pub(crate) trait EmitError {
    fn emit_error(&self, error: ErrorPayload) -> Result<()>;
}

impl<R: Runtime> EmitError for Window<R> {
    fn emit_error(&self, error: ErrorPayload) -> Result<()> {
        self.emit("error", error)
    }
}
