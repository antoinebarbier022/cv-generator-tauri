import { SectionPage } from '@/common/section/containers/section-container'

export const FormationSection = () => {
  return (
    <SectionPage
      sectionKey="formation"
      options={{
        inputType: 'textarea',
        inputMaxWarningLength: 55
      }}
    />
  )
}
