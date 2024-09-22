import { UUID } from 'crypto'

interface Translation {
  en: string
  fr: string
  [key: string]: string
}

export interface ResumeSection<T> {
  type: 'common' | 'experiences'
  id: UUID
  isHidden?: boolean
  content: T
}

export interface ResumeCommonSection extends ResumeSection<Translation> {
  type: 'common'
}

export interface ResumeExperiencesSection extends ResumeSection<UserDataExperience> {
  type: 'experiences'
}

export interface UserData {
  firstname: string
  lastname: string
  picture: string
  email: string
  role: Translation
  grade: string
  entity: string
  team: string
  description: Translation
  linkedin: string
  twitter: string
  github: string
  formation: ResumeCommonSection[]
  employment_history: ResumeCommonSection[]
  articles_and_others: ResumeCommonSection[]
  sectors: ResumeCommonSection[]
  skills: ResumeCommonSection[]
  languages: ResumeCommonSection[]
  experiences: ResumeExperiencesSection[]
  [key as string]: unknown
}

export interface UserDataExperience {
  program: string
  client: string
  role: Translation
  date: string
  context: Translation
  contribution: Translation
}
