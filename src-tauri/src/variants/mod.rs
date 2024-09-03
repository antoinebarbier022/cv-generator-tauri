use std::fs::File;
use std::io;
use std::io::{BufReader, Write};
use std::path::{Path, PathBuf};
use serde::{Deserialize, Serialize};
use crate::model::Resume;
use crate::variants::model::ResumeVariant;
use thiserror::Error;


pub mod model;
mod file;
mod errors;

pub use errors::Error;

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
struct SavedResumeVariant {
    pub(crate) base_path: PathBuf,
    pub(crate) overrides: model::ResumeOverrides
}

impl TryInto<ResumeVariant> for SavedResumeVariant {
    type Error = Error;

    fn try_into(self) -> Result<ResumeVariant, Self::Error> {
        let file = File::open(self.base_path)?;
        let base: Resume = serde_json::de::from_reader(BufReader::new(file)).map_err(|err| err.into())?;

        Ok(ResumeVariant {
            base: base.into(),
            overrides
        })
    }
}

