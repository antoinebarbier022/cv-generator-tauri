use std::fs::File;
use std::path::Path;
use crate::model::Resume;
use crate::variants::{Error, SavedResumeVariant};
use crate::variants::model::ResumeVariant;

impl ResumeVariant {
    fn save(&self, path: impl AsRef<Path>, base_path: impl AsRef<Path>) -> Result<(), Error> {
        let saved = SavedResumeVariant {
            base_path: base_path.into(),
            overrides: self.overrides.clone(),
        };

        serde_json::ser::to_writer(File::create(path)?, &saved)?;

        Ok(())
    }

    fn load(path: impl AsRef<Path>) -> Result<Self, Error> {
        let saved: SavedResumeVariant = serde_json::de::from_reader(File::open(path)?)?;
        let base: Resume = serde_json::de::from_reader(File::open(saved.base_path)?)?;

        Ok(Self {
            base: base.into(),
            overrides: saved.overrides
        })
    }
}

impl crate::variants::model::Resume {
    fn save(&self, path: impl AsRef<Path>) -> Result<(), Error> {
        let resume_model: Resume = self.into();

        serde_json::ser::to_writer(File::open(path)?, &resume_model).into()
    }

    fn load(path: impl AsRef<Path>) -> Result<Self, Error> {
        let resume_model: Resume = serde_json::de::from_reader(File::open(path)?)?;

        resume_model.into()
    }
}