import { SectionPage } from '@/common/section/containers/section-container'

export const EmploymentHistorySection = () => {
  return (
    <SectionPage
      sectionKey="employment_history"
      options={{
        inputType: 'textarea',
        inputMaxWarningLength: 55
      }}
    />
  )
}
