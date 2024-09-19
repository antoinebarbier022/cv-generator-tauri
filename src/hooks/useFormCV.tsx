import { confirm } from '@tauri-apps/plugin-dialog'
import { DropResult } from 'react-beautiful-dnd'

import { reorderListSection } from '../utils/drag-and-drop.utils'
import { isEmptyObject } from '../utils/object.utils'

import { ResumeContentSection, Translation, UserDataExperience } from '@/types/storage'

import { useExpandedItemStore } from '@/stores/useExpandedItemStore'
import { useFormStore } from '@/stores/useFormStore'

import { useEffect } from 'react'
import { useGetDataStorage } from './useGetDataStorage'

export const useFormCV = () => {
  const userData = useGetDataStorage()
  const { formValues, setFormValues } = useFormStore()

  const { setExpandedItem } = useExpandedItemStore()

  useEffect(() => {
    const oldFormContent = localStorage.getItem('form-data-cv')
    if (!oldFormContent) return
    // deepEqual(JSON.parse(oldFormContent) as UserData, emptyInitialResume)
    if (userData.data) {
      setFormValues(userData.data)
    }
  }, [userData.data])

  type ResumeSectionFieldName =
    | 'employment_history'
    | 'skills'
    | 'sectors'
    | 'languages'
    | 'formation'
    | 'experiences'

  const handleAddItemSection = ({ fieldName }: { fieldName: ResumeSectionFieldName }) => {
    if (formValues[fieldName].length >= 1 && isEmptyObject(formValues[fieldName][0].content)) {
      setExpandedItem(formValues[fieldName][0].id)
      return
    }
    const newId = crypto.randomUUID()
    const fieldValue = () => {
      switch (fieldName) {
        case 'experiences':
          return {
            id: newId,
            content: {
              client: '',
              program: '',
              role: {
                en: '',
                fr: ''
              },
              date: '',
              context: {
                en: '',
                fr: ''
              },
              contribution: {
                en: '',
                fr: ''
              }
            }
          } as ResumeContentSection<UserDataExperience>
        case 'employment_history':
        case 'skills':
        case 'languages':
        case 'formation':
        default:
          return {
            id: newId,
            content: { fr: '', en: '' }
          } as ResumeContentSection<Translation>
      }
    }

    console.info(`Add new item ${newId} from ${fieldName}.`)
    setFormValues({
      [fieldName]: [fieldValue(), ...(formValues[fieldName] ?? [])]
    })

    setExpandedItem(newId)
  }

  const dragEnded = (result: DropResult, fieldName: ResumeSectionFieldName) => {
    if (!result.destination) {
      return
    }

    setFormValues({
      [fieldName]: reorderListSection(
        formValues[fieldName],
        result.source.index,
        result.destination.index
      )
    })
  }

  const handleDeleteItemSection = async ({
    fieldName,
    idSelected
  }: {
    fieldName: ResumeSectionFieldName
    idSelected: string
  }) => {
    const section = formValues[fieldName] as unknown as ResumeContentSection<unknown>[]

    const indexSelectedItem = section.findIndex((e) => e.id === idSelected)
    const showDialogConfirm =
      indexSelectedItem !== -1 && !isEmptyObject(section[indexSelectedItem].content)

    if (showDialogConfirm) {
      const confirmed = await confirm('This action cannot be reverted. Are you sure?', {
        title: `Delete item`,
        kind: 'warning'
      })
      if (!confirmed) return
    }
    console.info(`Delete item ${idSelected} from ${fieldName}.`)
    setFormValues({
      [fieldName]: [...(formValues[fieldName]?.filter((v) => v.id !== idSelected) ?? [])]
    })
  }

  return {
    formValues,
    setFormValues,
    handleAddItemSection,
    handleDeleteItemSection,
    dragEnded
  }
}
