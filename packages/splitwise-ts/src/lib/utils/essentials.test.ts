import { describe, expect, it } from 'vitest'
import { flatten } from './essentials'

describe('flatten', () => {
  it('should return an empty object for empty input', () => {
    expect(flatten({})).toEqual({})
  })

  it('should pass through flat key-value pairs unchanged', () => {
    expect(flatten({ a: 1, b: 'hello', c: true })).toEqual({
      a: 1,
      b: 'hello',
      c: true,
    })
  })

  it('should flatten nested plain objects with underscore delimiter', () => {
    expect(flatten({ user: { name: 'Ada', age: 30 } })).toEqual({
      user_name: 'Ada',
      user_age: 30,
    })
  })

  it('should flatten arrays using index as key', () => {
    expect(flatten({ items: ['a', 'b', 'c'] })).toEqual({
      items_0: 'a',
      items_1: 'b',
      items_2: 'c',
    })
  })

  it('should flatten arrays of objects (Splitwise users pattern)', () => {
    const input = {
      users: [
        { id: '0', description: 'Salad' },
        { id: '1', description: 'Pizza' },
      ],
    }
    expect(flatten(input)).toEqual({
      users_0_id: '0',
      users_0_description: 'Salad',
      users_1_id: '1',
      users_1_description: 'Pizza',
    })
  })

  it('should handle deeply nested objects', () => {
    const input = { a: { b: { c: { d: 'deep' } } } }
    expect(flatten(input)).toEqual({ a_b_c_d: 'deep' })
  })

  it('should handle mixed primitives and nested structures', () => {
    const input = {
      message: 'hello',
      paid: '234',
      users: [{ id: '0' }],
    }
    expect(flatten(input)).toEqual({
      message: 'hello',
      paid: '234',
      users_0_id: '0',
    })
  })

  it('should skip empty nested objects', () => {
    const input = { a: 1, b: {} }
    const result = flatten(input)
    expect(result).toHaveProperty('a', 1)
    // Empty objects have no keys, so b should appear as the value itself
    expect(result).toHaveProperty('b')
  })

  it('should preserve null and undefined values', () => {
    const input = { a: null, b: undefined }
    expect(flatten(input)).toEqual({ a: null, b: undefined })
  })

  it('should use custom delimiter when provided', () => {
    const input = { user: { name: 'Ada' } }
    expect(flatten(input, '', '__')).toEqual({ user__name: 'Ada' })
  })

  it('should use prefix when provided', () => {
    const input = { name: 'Ada' }
    expect(flatten(input, 'user')).toEqual({ user_name: 'Ada' })
  })
})
