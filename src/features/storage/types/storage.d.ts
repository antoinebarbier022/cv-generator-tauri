import { UUID } from "crypto";

interface Translation {
  en: string;
  fr: string;
  [key: string]: string;
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
  formations: Translation[];
  employment_history: Translation[];
  articles_and_others: Translation[];
  sectors: Translation[];
  skills: Translation[];
  languages: Translation[];
  experiences: UserDataExperience[];
}

export interface UserDataExperience {
  id: UUID;
  program: string;
  client: string;
  role: string;
  date: string;
  context: Translation;
  contribution: Translation;
}
