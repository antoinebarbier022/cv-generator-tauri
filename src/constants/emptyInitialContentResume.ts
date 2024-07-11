import { UserData } from "../features/storage/types/storage";

export const emptyInitialContentResume: UserData = {
  firstname: "",
  lastname: "",
  picture: "",
  email: "",
  role: {
    en: "",
    fr: "",
  },
  grade: "",
  entity: "",
  team: "",
  description: {
    en: "",
    fr: "",
  },
  linkedin: "",
  twitter: "",
  github: "",
  formations: [],
  employment_history: [],
  articles_and_others: [],
  sectors: [],
  skills: [],
  languages: [],
  experiences: [],
};
