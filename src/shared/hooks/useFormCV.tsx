import { confirm } from '@tauri-apps/plugin-dialog'
import { DropResult } from 'react-beautiful-dnd'

import { reorderListSection } from '../utils/drag-and-drop.utils'
import { isEmptyObject } from '../utils/object.utils'

import {
  ResumeCommonSection,
  ResumeSection,
  UserDataExperience
} from '@/core/storage/types/storage'

import { useExpandedItemStore } from '@/shared/stores/useExpandedItemStore'
import { useFormStore } from '@/shared/stores/useFormStore'

import { SectionFieldName } from '@/features/section/sections.types'
import { useEffect } from 'react'
import { useGetDataStorage } from '../../core/storage/useGetDataStorage'
import { AppTheme } from './useAppTheme'
import { useEasterEggTheme } from './useEasterEggTheme'

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

  const { remove: removeEasterEggTheme } = useEasterEggTheme()

  const handleAddItemSection = ({ fieldName }: { fieldName: SectionFieldName }) => {
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
          } as ResumeSection<UserDataExperience>
        case 'employment_history':
        case 'skills':
        case 'languages':
        case 'formation':
        default:
          return {
            id: newId,
            content: { fr: '', en: '' }
          } as ResumeCommonSection
      }
    }

    console.info(`Add new item ${newId} from ${fieldName}.`)
    setFormValues({
      [fieldName]: [fieldValue(), ...(formValues[fieldName] ?? [])]
    })

    setExpandedItem(newId)
  }

  const dragEnded = (result: DropResult, fieldName: SectionFieldName) => {
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
    fieldName: SectionFieldName
    idSelected: string
  }) => {
    const section = formValues[fieldName] as unknown as ResumeSection<unknown>[]

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
    if (fieldName !== 'experiences') {
      removeEasterEggTheme({
        secretWord: 'pirate',
        targetSectionKey: 'employment_history',
        currentSectionKey: fieldName,
        itemId: idSelected,
        targetTheme: AppTheme.ONE_PIECE
      })
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
