import { AccordionGroup, Stack } from '@mui/joy'

import { useTranslation } from 'react-i18next'

import { SectionDroppableLayout } from '@/common/section/layouts/section-droppable-layout'

import { SectionEmptyState } from '@/common/section/components/section-empty-state'
import { useFormCV } from '@/hooks/useFormCV'
import { ResumeContentSection, UserDataExperience } from '@/types/storage'
import { ProjectItem } from './project-item'

export const ProjectsSection = () => {
  const { t } = useTranslation()
  const { formValues, setFormValues, dragEnded, handleDeleteItemSection, handleAddItemSection } =
    useFormCV()

  const handleAddProject = async () => {
    handleAddItemSection({ fieldName: 'experiences' })
  }
  const isEmptyData = formValues.experiences.length === 0

  const handleDeleteById = (id: string) => {
    handleDeleteItemSection({ fieldName: 'experiences', idSelected: id })
  }

  const handleEditContentItem = (data: ResumeContentSection<UserDataExperience>) => {
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
            <ProjectItem
              index={index}
              key={field.id}
              data={field}
              draggableId={field.id}
              isVisible={Boolean(field.isHidden)}
              onChangeVisibility={(value) => handleChangeVisibility(index, value)}
              onDelete={() => handleDeleteById(field.id)}
              onChange={(value) => {
                handleEditContentItem(value)
              }}
            />
          ))}
        </AccordionGroup>
      </SectionDroppableLayout>
    </>
  )
}
