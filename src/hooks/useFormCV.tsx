import { useFormik } from 'formik'
import { useEffect, useMemo } from 'react'

import { confirm } from '@tauri-apps/api/dialog'
import { DropResult } from 'react-beautiful-dnd'
import { emptyInitialResume } from '../constants/empty-initial-resume'

import { reorderListSection } from '../utils/drag-and-drop.utils'
import { isEmptyObject } from '../utils/object.utils'

import { useExpandedItemStore } from '@/stores/useExpandedItemStore'
import { useWarningsStore } from '@/stores/useWarningsStore'
import { ResumeContentSection, Translation, UserData, UserDataExperience } from '@/types/storage'
import { countWarnings } from '@/utils/warnings.utils'
import { finalFormValidationSchema } from '@/validations/dataContentValidationSchema'
import { useGetDataStorage } from './useGetDataStorage'
import { useSetDataStorage } from './useSetDataStorage'

export const useFormCV = () => {
  const userData = useGetDataStorage()
  const dataMutation = useSetDataStorage()

  const { setCountWarnings } = useWarningsStore()
  const { setExpandedItem } = useExpandedItemStore()

  const initialValues = useMemo(() => userData.data, [userData.data])

  const formik = useFormik<UserData>({
    initialValues: initialValues ?? emptyInitialResume,
    enableReinitialize: true,

    onSubmit: async (values) => {
      await formikOnlyForWarnings.setValues(values)
      await formikOnlyForWarnings.validateForm(values)

      dataMutation.mutate({ values })
    }
  })

  const formikOnlyForWarnings = useFormik<UserData>({
    initialValues: initialValues ?? emptyInitialResume,
    validationSchema: finalFormValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,

    onSubmit: () => {}
  })

  useEffect(() => {
    if (
      !formikOnlyForWarnings.isValidating &&
      formikOnlyForWarnings.touched &&
      formikOnlyForWarnings.errors
    ) {
      setCountWarnings(countWarnings(formikOnlyForWarnings.errors))
    }
  }, [
    formikOnlyForWarnings.isValidating,
    formikOnlyForWarnings.touched,
    formikOnlyForWarnings.errors
  ])

  type ResumeSectionFieldName =
    | 'employment_history'
    | 'skills'
    | 'sectors'
    | 'languages'
    | 'formation'
    | 'experiences'

  const handleAddItemSection = ({ fieldName }: { fieldName: ResumeSectionFieldName }) => {
    if (
      formik.values[fieldName].length >= 1 &&
      isEmptyObject(formik.values[fieldName][0].content)
    ) {
      setExpandedItem(formik.values[fieldName][0].id)
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

    formik.setFieldValue(fieldName, [fieldValue(), ...(formik.values[fieldName] ?? [])])
    formik.submitForm()
    setExpandedItem(newId)
  }

  const dragEnded = (result: DropResult, fieldName: ResumeSectionFieldName) => {
    if (!result.destination) {
      return
    }

    const items = reorderListSection(
      formik.values[fieldName],
      result.source.index,
      result.destination.index
    )

    formik.setFieldValue(fieldName, items)
    formik.submitForm()
  }

  const handleDeleteItemSection = async ({
    fieldName,
    idSelected
  }: {
    fieldName: ResumeSectionFieldName
    idSelected: string
  }) => {
    const section = formik.values[fieldName] as unknown as ResumeContentSection<unknown>[]

    const indexSelectedItem = section.findIndex((e) => e.id === idSelected)
    const showDialogConfirm =
      indexSelectedItem && !isEmptyObject(section[indexSelectedItem].content)

    if (showDialogConfirm) {
      const confirmed = await confirm('This action cannot be reverted. Are you sure?', {
        title: `Delete item`,
        type: 'warning'
      })
      if (!confirmed) return
    }
    await formik.setFieldValue(fieldName, [
      ...(formik.values[fieldName]?.filter((v) => v.id !== idSelected) ?? [])
    ])
    await formik.submitForm()
  }

  return {
    formikWarnings: formikOnlyForWarnings.errors,
    formik,
    userData,
    handleAddItemSection,
    handleDeleteItemSection,
    dragEnded
  }
}
