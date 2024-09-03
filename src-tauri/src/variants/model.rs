use std::collections::BTreeMap;
use std::path::PathBuf;
use serde::{Deserialize, Serialize};
use crate::model::LocalizedString;

type ID = String;


#[derive(Default, Debug, Clone, Eq, PartialEq)]
pub(crate) struct Resume {
    firstname: String,
    lastname: String,
    picture: String,
    role: LocalizedString,
    grade: String,
    entity: String,
    team: String,
    description: LocalizedString,
    linkedin: String,
    twitter: Option<String>,
    formation: BTreeMap<ID, SectionEntry>,
    employment_history: BTreeMap<ID, SectionEntry>,
    articles_and_others: BTreeMap<ID, SectionEntry>,
    sectors: BTreeMap<ID, SectionEntry>,
    skills: BTreeMap<ID, SectionEntry>,
    languages: BTreeMap<ID, SectionEntry>,
    experiences: BTreeMap<ID, ExperienceSectionEntry>,
}

impl From<crate::model::Resume> for Resume {
    fn from(value: crate::model::Resume) -> Self {
        Self {
            firstname: value.firstname.into(),
            lastname: value.lastname.into(),
            picture: value.picture.into(),
            role: value.role.into(),
            grade: value.grade.into(),
            entity: value.entity.into(),
            team: value.team.into(),
            description: value.description.into(),
            linkedin: value.linkedin.into(),
            twitter: value.twitter.into(),
            formation: SectionEntry::into_map(value.formation),
            employment_history: SectionEntry::into_map(value.employment_history),
            articles_and_others: SectionEntry::into_map(value.articles_and_others),
            sectors: SectionEntry::into_map(value.sectors),
            skills: SectionEntry::into_map(value.skills),
            languages: SectionEntry::into_map(value.languages),
            experiences: ExperienceSectionEntry::into_map(value.experiences),
        }
    }
}

#[derive(Debug, Clone, Eq, PartialEq)]
struct SectionEntry {
    is_hidden: bool,
    content: LocalizedString
}

impl SectionEntry {
    fn into_map(value: Vec<crate::model::SectionEntry>) -> BTreeMap<ID, SectionEntry> {
        value.into_iter().map(|v| {
            (v.id.clone(), <SectionEntry as From<crate::model::SectionEntry>>::from(v))
        }).collect()
    }
}

impl From<crate::model::SectionEntry> for SectionEntry {
    fn from(value: crate::model::SectionEntry) -> Self {
        Self {
            is_hidden: value.is_hidden.unwrap_or_default(),
            content: value.content
        }
    }
}

#[derive(Debug, Clone, Eq, PartialEq)]
struct ExperienceSectionEntry {
    is_hidden: bool,
    program: String,
    client: String,
    role: LocalizedString,
    date: String,
    context: LocalizedString,
    contribution: LocalizedString,
}

impl ExperienceSectionEntry {
    fn into_map(value: Vec<crate::model::ExperienceSectionEntry>) -> BTreeMap<ID, ExperienceSectionEntry> {
        value.into_iter().map(|v| {
            (v.id.clone(), <ExperienceSectionEntry as From<crate::model::ExperienceSectionEntry>>::from(v))
        }).collect()
    }
}

impl From<crate::model::ExperienceSectionEntry> for ExperienceSectionEntry {
    fn from(value: crate::model::ExperienceSectionEntry) -> Self {
        Self {
            is_hidden: value.is_hidden.unwrap_or_default(),
            program: value.content.program,
            client: value.content.client,
            role: value.content.role,
            date: value.content.date,
            context: value.content.context,
            contribution: value.content.contribution,
        }
    }
}

#[derive(Default, Debug, Clone, Eq, PartialEq)]
enum VariantValue<T> {
    #[default]
    Inherit,
    Removed,
    Override(T),
}

trait Overridable: Sized {
    type Variant;

    fn apply_override(self, variant_value: Self::Variant) -> Self;
}

impl <T: Clone> Overridable for BTreeMap<ID, T> {
    type Variant = BTreeMap<ID, VariantValue<T>>;
    fn apply_override(self, mut variant_value: BTreeMap<ID, VariantValue<T>>) -> Self {
        let mut result: BTreeMap<ID, T> = BTreeMap::new();

        for (id, value) in self {
            if let Some(overrided) = variant_value.remove(&id) {
                match overrided {
                    VariantValue::Inherit => { result.insert(id, value); }
                    VariantValue::Removed => { /* do nothing */ }
                    VariantValue::Override(new_value) => {
                        result.insert(id.clone(), new_value.clone());
                    }
                }
            } else {
                result.insert(id, value);
            }
        }


        for (id, value) in variant_value {
            if let VariantValue::Override(value) = value {
                result.insert(id, value);
            }
        }

        result
    }
}

macro_rules! overridable {
    ($t: ident) => {
        impl Overridable for $t {
            type Variant = VariantValue<Self>;

            fn apply_override(self, variant_value: Self::Variant) -> Self {
                match variant_value {
                    VariantValue::Inherit => self,
                    VariantValue::Override(value) => value,
                    VariantValue::Removed => Default::default()
                }
            }
        }

        impl Overridable for Option<$t> {
            type Variant = VariantValue<Self>;

            fn apply_override(self, variant_value: Self::Variant) -> Self {
                match variant_value {
                    VariantValue::Inherit => self,
                    VariantValue::Override(value) => value,
                    VariantValue::Removed => Default::default()
                }
            }
        }
    };
}

overridable!(String);
overridable!(LocalizedString);
overridable!(bool);

#[derive(Default, Debug, Clone, Eq, PartialEq)]
pub(crate) struct ResumeOverrides {
    firstname: VariantValue<String>,
    lastname: VariantValue<String>,
    picture: VariantValue<String>,
    role: VariantValue<LocalizedString>,
    grade: VariantValue<String>,
    entity: VariantValue<String>,
    team: VariantValue<String>,
    description: VariantValue<LocalizedString>,
    linkedin: VariantValue<String>,
    twitter: VariantValue<Option<String>>,
    formation: BTreeMap<ID, VariantValue<SectionEntry>>,
    employment_history: BTreeMap<ID, VariantValue<SectionEntry>>,
    articles_and_others: BTreeMap<ID, VariantValue<SectionEntry>>,
    sectors: BTreeMap<ID, VariantValue<SectionEntry>>,
    skills: BTreeMap<ID, VariantValue<SectionEntry>>,
    languages: BTreeMap<ID, VariantValue<SectionEntry>>,
    experiences: BTreeMap<ID, VariantValue<ExperienceSectionEntry>>,
}

#[derive(Debug, Clone, Eq, PartialEq)]
pub(crate) struct ResumeVariant {
    pub(crate) base: Resume,
    pub(crate) overrides: ResumeOverrides
}

impl ResumeVariant {
    fn compute(self) -> Resume {
        Resume {
            firstname: self.base.firstname.apply_override(self.overrides.firstname),
            lastname: self.base.lastname.apply_override(self.overrides.lastname),
            picture: self.base.picture.apply_override(self.overrides.picture),
            role: self.base.role.apply_override(self.overrides.role),
            grade: self.base.grade.apply_override(self.overrides.grade),
            entity: self.base.entity.apply_override(self.overrides.entity),
            team: self.base.team.apply_override(self.overrides.team),
            description: self.base.description.apply_override(self.overrides.description),
            linkedin: self.base.linkedin.apply_override(self.overrides.linkedin),
            twitter: self.base.twitter.apply_override(self.overrides.twitter),
            formation: self.base.formation.apply_override(self.overrides.formation),
            employment_history: self.base.employment_history.apply_override(self.overrides.employment_history),
            articles_and_others: self.base.articles_and_others.apply_override(self.overrides.articles_and_others),
            sectors: self.base.sectors.apply_override(self.overrides.sectors),
            skills: self.base.skills.apply_override(self.overrides.skills),
            languages: self.base.languages.apply_override(self.overrides.languages),
            experiences: self.base.experiences.apply_override(self.overrides.experiences),
        }
    }
}


#[cfg(test)]
mod tests {
    use std::collections::BTreeMap;
    use std::default::Default;
    use crate::model::LocalizedString;
    use crate::variants::model::{Resume, ResumeOverrides, ResumeVariant, SectionEntry, VariantValue, ID};


    #[test]
    fn test_compute_variant() {
         let base = Resume {
             firstname: String::from("Jean"),
             lastname: String::from("Tambien"),
             description: LocalizedString {
                 fr: Some(String::from("Spécialiste de l'audition")),
                 en: None
             },
             skills: BTreeMap::from([
                 (ID::from("1"), SectionEntry{
                     is_hidden: false,
                     content: LocalizedString {
                         fr: Some(String::from("Blabla")),
                         en: None
                     },
                 }),
                 (ID::from("2"), SectionEntry{
                     is_hidden: false,
                     content: LocalizedString {
                         fr: Some(String::from("Blibli")),
                         en: None
                     },
                 }),
                 (ID::from("3"), SectionEntry{
                     is_hidden: false,
                     content: LocalizedString {
                         fr: Some(String::from("bloblob")),
                         en: None
                     },
                 }),
                 (ID::from("4"), SectionEntry{
                     is_hidden: false,
                     content: LocalizedString {
                         fr: Some(String::from("blublub")),
                         en: None
                     },
                 }),
             ]),
             ..Default::default()
         };

         let variant = ResumeVariant {
             base,
             overrides: ResumeOverrides {
                 lastname: VariantValue::Override(String::from("Neymar")),
                 skills: BTreeMap::from([
                     (ID::from("1"), VariantValue::Inherit),
                     (ID::from("2"), VariantValue::Removed),
                     (ID::from("3"), VariantValue::Override(SectionEntry{
                         is_hidden: false,
                         content: LocalizedString {
                             fr: Some(String::from("azerty")),
                             en: None
                         },
                     })),
                 ]),
                 ..ResumeOverrides::default()
             }
         };

         let expected = Resume {
             firstname: String::from("Jean"),
             lastname: String::from("Neymar"),
             description: LocalizedString {
                 fr: Some(String::from("Spécialiste de l'audition")),
                 en: None
             },
             skills: BTreeMap::from([
                 (ID::from("1"), SectionEntry{
                     is_hidden: false,
                     content: LocalizedString {
                         fr: Some(String::from("Blabla")),
                         en: None
                     },
                 }),
                 (ID::from("3"), SectionEntry{
                     is_hidden: false,
                     content: LocalizedString {
                         fr: Some(String::from("azerty")),
                         en: None
                     },
                 }),
                 (ID::from("4"), SectionEntry{
                     is_hidden: false,
                     content: LocalizedString {
                         fr: Some(String::from("blublub")),
                         en: None
                     },
                 }),
             ]),
             ..Default::default()
         };

         let result = variant.compute();

         assert_eq!(result, expected);
    }
}