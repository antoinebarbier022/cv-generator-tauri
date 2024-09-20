import { SectionStandardContainer } from '@/features/section/containers/section-standard-container'

export const EmploymentHistoryPage = () => {
  return (
    <SectionStandardContainer
      sectionKey="employment_history"
      options={{
        inputType: 'textarea',
        inputMaxWarningLength: 55
      }}
    />
  )
}
