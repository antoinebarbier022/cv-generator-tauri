import { AccordionGroup, Stack } from '@mui/joy'
import { useTranslation } from 'react-i18next'

import { useFormCV } from '@/hooks/useFormCV'

import { SectionDroppableLayout } from '@/common/section/layouts/section-droppable-layout'
import { SectionEmptyState } from '../components/section-empty-state'

import { useTranslatorOption } from '@/features/translators/hooks/useTranslatorOption'
import { Translation, UserData } from '../../../types/storage'
import { SectionStandardItem } from './section-standard-item'

interface Props {
  sectionKey: 'skills' | 'sectors' | 'languages' | 'formation' | 'employment_history'
  options?: {
    isOptionTranslation?: boolean
    inputType?: 'input' | 'textarea'
    inputMaxWarningLength?: number
  }
}
export const SectionStandardContainer = ({
  sectionKey,
  options = { isOptionTranslation: false, inputType: 'input', inputMaxWarningLength: undefined }
}: Props) => {
  const { t } = useTranslation()

  const { formValues, setFormValues, handleAddItemSection, handleDeleteItemSection, dragEnded } =
    useFormCV()

  const handleChangeVisibility = (index: number, value: boolean) => {
    const newContent = [...formValues[sectionKey]]
    newContent[index].isHidden = value
    setFormValues({
      [sectionKey]: newContent
    } as Partial<UserData>)
  }

  const handleEditContentItem = (id: string, content: Translation) => {
    const newContent = [...formValues[sectionKey]]
    newContent[newContent.findIndex((e) => e.id === id)].content = content

    setFormValues({
      [sectionKey]: newContent
    } as Partial<UserData>)
  }

  const handleDelete = (id: string) =>
    handleDeleteItemSection({
      fieldName: sectionKey,
      idSelected: id
    })

  const isEmpty = formValues[sectionKey].length === 0

  const { isActiveOptionValid } = useTranslatorOption()

  return (
    <SectionDroppableLayout
      title={t(`resume.section.${sectionKey}.title`)}
      chip={String(formValues[sectionKey].length)}
      droppableId={'droppable'}
      onDragEnd={(result) => dragEnded(result, sectionKey)}
      onAddItem={() => handleAddItemSection({ fieldName: sectionKey })}
      isEmpty={isEmpty}
      emptyContent={
        <SectionEmptyState
          title={t(`empty-state.${sectionKey}.title`)}
          description={t(`empty-state.${sectionKey}.description`)}
          labelButton={t(`empty-state.${sectionKey}.button.label`)}
          onClickButton={() => handleAddItemSection({ fieldName: sectionKey })}
        />
      }
    >
      <AccordionGroup disableDivider component={Stack}>
        {formValues[sectionKey]?.map((field, index) => (
          <SectionStandardItem
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
            isOptionTranslate={isActiveOptionValid}
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
