import { UserData } from '../types/storage'

export const emptyInitialResume: UserData = {
  firstname: '',
  lastname: '',
  picture: '',
  email: '',
  role: {
    en: '',
    fr: ''
  },
  grade: '',
  entity: '',
  team: '',
  description: {
    en: '',
    fr: ''
  },
  linkedin: '',
  twitter: '',
  github: '',
  formation: [],
  employment_history: [],
  articles_and_others: [],
  sectors: [],
  skills: [],
  languages: [],
  experiences: []
}
