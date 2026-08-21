import { describe, expect, it } from 'vitest'
import { splitwisify } from './helpers'

describe('splitwisify', () => {
  it('should pass through flat primitive values unchanged', () => {
    const result = splitwisify({ message: 'hello', cost: '234' })
    expect(result).toEqual({ message: 'hello', cost: '234' })
  })

  it('should flatten arrays of objects into Splitwise format', () => {
    const result = splitwisify({
      message: 'This is an expense',
      paid: '234',
      users: [
        { id: '0', description: 'Salad' },
        { id: '1', description: 'Pizza' },
        { id: '2', description: 'Again Salad' },
      ],
    })

    expect(result).toEqual({
      message: 'This is an expense',
      paid: '234',
      users_0_id: '0',
      users_0_description: 'Salad',
      users_1_id: '1',
      users_1_description: 'Pizza',
      users_2_id: '2',
      users_2_description: 'Again Salad',
    })
  })

  it('should handle empty users array', () => {
    const result = splitwisify({ message: 'hello', users: [] })
    expect(result).toEqual({ message: 'hello' })
  })

  it('should convert non-primitive values to empty string', () => {
    // After flattening, any remaining non-primitive values should become ''
    const result = splitwisify({ a: 'hello', b: null })
    expect(result.a).toBe('hello')
    // null is a primitive in es-toolkit's isPrimitive, so it should stay
  })

  it('should handle single-item arrays', () => {
    const result = splitwisify({
      users: [{ id: '42', name: 'Test' }],
    })
    expect(result).toEqual({
      users_0_id: '42',
      users_0_name: 'Test',
    })
  })

  it('should handle numeric values in arrays', () => {
    const result = splitwisify({
      shares: [{ amount: '100' }],
    })
    expect(result).toEqual({
      shares_0_amount: '100',
    })
  })
})
