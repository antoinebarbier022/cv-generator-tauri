import { UUID } from "crypto";

interface Translation {
  en: string;
  fr: string;
  [key: string]: string;
}

export interface ResumeContentSection<T> {
  id: UUID;
  content: T;
}
export interface UserData {
  firstname: string;
  lastname: string;
  picture: string;
  email: string;
  role: Translation;
  grade: string;
  entity: string;
  team: string;
  description: Translation;
  linkedin: string;
  twitter: string;
  github: string;
  formation: ResumeContentSection<Translation>[];
  employment_history: ResumeContentSection<Translation>[];
  articles_and_others: ResumeContentSection<Translation>[];
  sectors: ResumeContentSection<Translation>[];
  skills: ResumeContentSection<Translation>[];
  languages: ResumeContentSection<Translation>[];
  experiences: ResumeContentSection<UserDataExperience>[];
}

export interface UserDataExperience {
  program: string;
  client: string;
  role: Translation;
  date: string;
  context: Translation;
  contribution: Translation;
}
