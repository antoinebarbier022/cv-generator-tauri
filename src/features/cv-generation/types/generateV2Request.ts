interface TranslationAPI {
  en?: string;
  fr?: string;
}

interface ResumeSectionCommonAPI {
  id: string;
  isHidden?: boolean | null;
  content: TranslationAPI;
}

interface ResumeSectionExperienceAPI {
  id: string;
  isHidden?: boolean | null;
  content: ExperienceAPI;
}

interface ExperienceAPI {
  program: string;
  client: string;
  role: TranslationAPI;
  date: string;
  context: TranslationAPI;
  contribution: TranslationAPI;
}

export interface generateV2Request {
  firstname: string;
  lastname: string;
  picture: string;
  role: TranslationAPI;
  grade: string;
  entity: string;
  team: string;
  description: TranslationAPI;
  linkedin: string;
  twitter?: string | null;
  formation: ResumeSectionCommonAPI[];
  employment_history: ResumeSectionCommonAPI[];
  articles_and_others: ResumeSectionCommonAPI[];
  sectors: ResumeSectionCommonAPI[];
  skills: ResumeSectionCommonAPI[];
  languages: ResumeSectionCommonAPI[];
  experiences: ResumeSectionExperienceAPI[];
}
