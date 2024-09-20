import { ResumeCommonSection, ResumeExperiencesSection } from '@/core/storage/types/storage'

export const reorderListSection = (
  list: (ResumeCommonSection | ResumeExperiencesSection)[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
