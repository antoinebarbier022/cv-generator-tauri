import { ResumeContentSection, Translation, UserDataExperience } from '@/types/storage'

export const reorderListSection = (
  list: ResumeContentSection<Translation | UserDataExperience>[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
