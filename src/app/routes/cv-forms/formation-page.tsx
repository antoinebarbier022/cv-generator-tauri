import { SectionStandardContainer } from '@/common/section/containers/section-standard-container'

export const FormationPage = () => {
  return (
    <SectionStandardContainer
      sectionKey="formation"
      options={{
        inputType: 'textarea',
        inputMaxWarningLength: 55
      }}
    />
  )
}
