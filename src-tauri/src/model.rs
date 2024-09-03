use serde::{Deserialize, Serialize};


#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
pub struct Resume {
    pub firstname: String,
    pub lastname: String,
    pub picture: String,
    pub role: LocalizedString,
    pub grade: String,
    pub entity: String,
    pub team: String,
    pub description: LocalizedString,
    pub linkedin: String,
    pub twitter: Option<String>,
    pub formation: Vec<SectionEntry>,
    pub employment_history: Vec<SectionEntry>,
    pub articles_and_others: Vec<SectionEntry>,
    pub sectors: Vec<SectionEntry>,
    pub skills: Vec<SectionEntry>,
    pub languages: Vec<SectionEntry>,
    pub experiences: Vec<ExperienceSectionEntry>,
}

#[derive(Default, Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
pub struct LocalizedString {
    pub en: Option<String>,
    pub fr: Option<String>,
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
pub struct SectionEntry {
    pub id: String,
    pub is_hidden: Option<bool>,
    pub content: LocalizedString
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
pub struct ExperienceSectionEntry {
    pub id: String,
    pub is_hidden: Option<bool>,
    pub content: Experience
}

#[derive(Debug, Clone, Eq, PartialEq, Serialize, Deserialize)]
pub struct Experience {
    pub program: String,
    pub client: String,
    pub role: LocalizedString,
    pub date: String,
    pub context: LocalizedString,
    pub contribution: LocalizedString,
}
