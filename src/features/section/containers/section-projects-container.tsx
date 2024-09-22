import { AccordionGroup, Stack } from '@mui/joy'

import { useTranslation } from 'react-i18next'

import { SectionDroppableLayout } from '@/features/section/layouts/section-droppable-layout'

import { ResumeExperiencesSection } from '@/core/storage/types/storage'
import { SectionEmptyState } from '@/features/section/components/section-empty-state'
import { useTranslatorApiKey } from '@/features/translators/hooks/useTranslatorApiKey'
import { useFormCV } from '@/shared/hooks/useFormCV'
import { useExpandedItemStore } from '@/shared/stores/useExpandedItemStore'
import { SectionProjectItem } from './section-project-item'

export const SectionProjectsContainer = () => {
  const { t } = useTranslation()
  const { formValues, setFormValues, dragEnded, handleDeleteItemSection, handleAddItemSection } =
    useFormCV()

  const { apiKey } = useTranslatorApiKey()
  const handleAddProject = async () => {
    handleAddItemSection({ fieldName: 'experiences' })
  }
  const isEmptyData = formValues.experiences.length === 0

  const handleDeleteById = (id: string) => {
    handleDeleteItemSection({ fieldName: 'experiences', idSelected: id })
  }

  const handleEditContentItem = (data: ResumeExperiencesSection) => {
    const newContent = [...formValues['experiences']]
    const indexNewContent = newContent.findIndex((e) => e.id === data.id)
    newContent[indexNewContent] = { ...data }

    setFormValues({ experiences: newContent })
  }

  const handleChangeVisibility = (index: number, value: boolean) => {
    const newContent = [...formValues['experiences']]
    newContent[index].isHidden = value
    setFormValues({ experiences: newContent })
  }

  const { expandedItem, setExpandedItem } = useExpandedItemStore()

  const isOptionTranslate = localStorage.getItem('option-translation') === 'true' && Boolean(apiKey)

  return (
    <>
      <SectionDroppableLayout
        title={t('resume.section.projects.title')}
        chip={String(formValues['experiences'].length)}
        droppableId={'droppable'}
        onDragEnd={(result) => dragEnded(result, 'experiences')}
        onAddItem={handleAddProject}
        isEmpty={isEmptyData}
        emptyContent={
          <SectionEmptyState
            title={t('empty-state.project.title')}
            description={t('empty-state.project.description')}
            labelButton={t('empty-state.project.button.label')}
            onClickButton={handleAddProject}
          />
        }
      >
        <AccordionGroup component={Stack} disableDivider>
          {formValues.experiences?.map((field, index) => (
            <SectionProjectItem
              index={index}
              key={field.id}
              data={field}
              draggableId={field.id}
              isVisible={Boolean(field.isHidden)}
              isOptionTranslate={isOptionTranslate}
              onChangeVisibility={(value) => handleChangeVisibility(index, value)}
              onDelete={() => handleDeleteById(field.id)}
              onChange={(value) => {
                handleEditContentItem(value)
              }}
              isExpanded={expandedItem === field.id}
              onExpandedChange={(_, expanded) => {
                setExpandedItem(expanded ? field.id : undefined)
              }}
            />
          ))}
        </AccordionGroup>
      </SectionDroppableLayout>
    </>
  )
}
