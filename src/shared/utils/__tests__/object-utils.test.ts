import { describe, expect, it } from 'vitest'
import { isEmptyObject } from '../object.utils'

describe('isEmptyObject', () => {
  it('should return true for null, undefined, and empty string', () => {
    expect(isEmptyObject(null)).toBe(true)
    expect(isEmptyObject(undefined)).toBe(true)
    expect(isEmptyObject('')).toBe(true)
  })

  it('should return true for an empty array or empty string', () => {
    expect(isEmptyObject([])).toBe(true)
    expect(isEmptyObject('')).toBe(true)
  })

  it('should return false for non-empty array or non-empty string', () => {
    expect(isEmptyObject([1, 2, 3])).toBe(false)
    expect(isEmptyObject('non-empty string')).toBe(false)
  })

  it('should return true for empty object', () => {
    expect(isEmptyObject({})).toBe(true)
  })

  it('should return false for non-empty object', () => {
    expect(isEmptyObject({ key: 'value' })).toBe(false)
  })

  it('should handle nested objects and arrays', () => {
    expect(isEmptyObject({ nested: {} })).toBe(true)
    expect(isEmptyObject({ nested: { key: 'value' } })).toBe(false)
    expect(isEmptyObject({ nested: { key: '' } })).toBe(true)
    expect(isEmptyObject({ nested: [] })).toBe(true)
    expect(isEmptyObject({ nested: [1, 2, 3] })).toBe(false)
  })

  it('should return false for numbers and booleans', () => {
    expect(isEmptyObject(42)).toBe(false)
    expect(isEmptyObject(true)).toBe(false)
  })
})
