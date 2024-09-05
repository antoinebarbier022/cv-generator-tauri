import { SectionPage } from '@/containers/section-container'

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
