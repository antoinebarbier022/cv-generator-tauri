import { isEmptyObject } from '@/utils/object.utils'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'

export const useSection = <T,>(sectionKey: string) => {
  const section = useQuery({
    queryKey: ['section', sectionKey],
    queryFn: () => [] as T[]
  })

  let [sectionList, setSectionList] = useState(section.data ?? [])

  const dragEnded = (result: DropResult) => {
    if (!result.destination) return
    const startIndex = result.source.index
    const endIndex = result.destination.index

    // Reorder the list
    const reorderedList = (): T[] => {
      const tempArray = Array.from(sectionList)
      const [removed] = tempArray.splice(startIndex, 1)
      return tempArray.splice(endIndex, 0, removed)
    }

    //  liste avec le nouveau positionnement
    setSectionList([...reorderedList()])
  }

  const addItem = (): string => {
    return crypto.randomUUID()
  }

  const isEmpty = (): boolean => {
    return section.data ? isEmptyObject(section.data) : false
  }

  return { addItem, dragEnded, isEmpty, ...section }
}
