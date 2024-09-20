import { SectionStandardContainer } from '@/features/section/containers/section-standard-container'

export const SkillsPage = () => {
  return (
    <SectionStandardContainer
      sectionKey="skills"
      options={{
        inputType: 'textarea'
      }}
    />
  )
}
