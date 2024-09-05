import { AccordionGroup, Stack } from '@mui/joy'
import { useTranslation } from 'react-i18next'

import { useFormCV } from '@/hooks/useFormCV'

import { SectionDroppableLayout } from '@/layouts/section-droppable-layout'
import { EmptyState } from '../components/empty-state'
import { Translation } from '../types/storage'
import { SectionItem } from './section-item'

interface Props {
  sectionKey: 'skills' | 'sectors' | 'languages' | 'formation' | 'employment_history'
  options?: {
    inputType?: 'input' | 'textarea'
    inputMaxWarningLength?: number
  }
}
export const SectionPage = ({
  sectionKey,
  options = { inputType: 'input', inputMaxWarningLength: undefined }
}: Props) => {
  const { t } = useTranslation()

  const { userData, formik, handleAddItemSection, handleDeleteItemSection, dragEnded } = useFormCV()

  const handleChangeVisibility = (index: number, value: boolean) => {
    const newContent = [...formik.values[sectionKey]]
    newContent[index].isHidden = value
    formik.setFieldValue(sectionKey, newContent)
    formik.submitForm()
  }

  const handleEditContentItem = (id: string, content: Translation) => {
    const newContent = [...formik.values[sectionKey]]
    newContent[newContent.findIndex((e) => e.id === id)].content = content

    formik.setFieldValue(sectionKey, newContent)
    formik.submitForm()
  }

  const handleDelete = (id: string) =>
    handleDeleteItemSection({
      fieldName: sectionKey,
      idSelected: id
    })

  const isEmpty = userData.data && userData.data[sectionKey].length === 0

  return (
    <SectionDroppableLayout
      title={t(`resume.section.${sectionKey}.title`)}
      chip={String(formik.values[sectionKey].length)}
      droppableId={'droppable'}
      onDragEnd={(result) => dragEnded(result, sectionKey)}
      onAddItem={() => handleAddItemSection({ fieldName: sectionKey })}
      isError={userData.isError}
      isEmpty={isEmpty}
      isLoading={userData.isPending}
      emptyContent={
        <EmptyState
          title={t(`empty-state.${sectionKey}.title`)}
          description={t(`empty-state.${sectionKey}.description`)}
          labelButton={t(`empty-state.${sectionKey}.button.label`)}
          onClickButton={() => handleAddItemSection({ fieldName: sectionKey })}
        />
      }
    >
      <AccordionGroup disableDivider component={Stack}>
        {formik.values[sectionKey]?.map((field, index) => (
          <SectionItem
            index={index}
            key={field.id}
            id={field.id}
            draggableId={field.id}
            titlePlaceholder={`${t(`resume.section.${sectionKey}.item.placeholder`)} ${index + 1}`}
            inputType={options.inputType}
            content={field.content}
            maxWarningLength={options.inputMaxWarningLength}
            inputPlaceholder={''}
            isVisible={Boolean(field.isHidden)}
            onChangeVisibility={(value) => handleChangeVisibility(index, value)}
            onDelete={() => handleDelete(field.id)}
            onChange={(value) => {
              handleEditContentItem(value.id, value.content)
            }}
          />
        ))}
      </AccordionGroup>
    </SectionDroppableLayout>
  )
}
