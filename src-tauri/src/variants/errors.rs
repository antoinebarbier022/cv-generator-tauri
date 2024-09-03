use std::io;
use thiserror::Error;

#[derive(Error, Debug)]
pub(crate) enum Error {
    Io(#[from] io::Error),
    SerDe(#[from] serde_json::error::Error)
}