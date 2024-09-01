import { UserData } from "../../storage/types/storage";

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
  formation: [],
  employment_history: [],
  articles_and_others: [],
  sectors: [],
  skills: [
    {
      id: crypto.randomUUID(),
      content: {
        en: "",
        fr: "",
      },
    },
    {
      id: crypto.randomUUID(),
      content: {
        en: "",
        fr: "",
      },
    },
  ],
  languages: [],
  experiences: [],
};
