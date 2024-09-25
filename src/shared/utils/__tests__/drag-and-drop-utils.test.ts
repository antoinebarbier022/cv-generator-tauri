import { describe, expect, it } from 'vitest'

import { ResumeCommonSection, ResumeExperiencesSection } from '@/core/storage/types/storage' // Assure-toi que le bon chemin est utilisé
import { reorderListSection } from '../drag-and-drop.utils'

const mockTranslation = { en: 'English text', fr: 'Texte français' }

const mockCommonSection: ResumeCommonSection = {
  type: 'common',
  id: crypto.randomUUID(),
  content: mockTranslation
}

const mockExperienceSection: ResumeExperiencesSection = {
  type: 'experiences',
  id: crypto.randomUUID(),
  content: {
    program: 'Program 1',
    client: 'Client 1',
    role: mockTranslation,
    date: '2024-09',
    context: mockTranslation,
    contribution: mockTranslation
  }
}

describe('reorderListSection', () => {
  it('should reorder sections by moving the element from startIndex to endIndex', () => {
    const list = [mockCommonSection, mockExperienceSection]
    const result = reorderListSection(list, 0, 1)
    expect(result[0]).toEqual(mockExperienceSection)
    expect(result[1]).toEqual(mockCommonSection)
  })

  it('should keep the same order if startIndex and endIndex are the same', () => {
    const list = [mockCommonSection, mockExperienceSection]
    const result = reorderListSection(list, 0, 0)
    expect(result).toEqual(list)
  })

  it('should correctly move elements when endIndex is before startIndex', () => {
    const list = [mockCommonSection, mockExperienceSection]
    const result = reorderListSection(list, 1, 0)
    expect(result[0]).toEqual(mockExperienceSection)
    expect(result[1]).toEqual(mockCommonSection)
  })

  it('should handle a list with more than two elements', () => {
    const section3: ResumeCommonSection = {
      type: 'common',
      id: crypto.randomUUID(),
      content: { en: 'Another section in English', fr: 'Une autre section en français' }
    }
    const list = [mockCommonSection, mockExperienceSection, section3]
    const result = reorderListSection(list, 2, 0)
    expect(result[0]).toEqual(section3)
    expect(result[1]).toEqual(mockCommonSection)
    expect(result[2]).toEqual(mockExperienceSection)
  })
})
