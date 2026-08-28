import { describe, expect, it } from 'vitest'
import { SplitwiseError, createError } from './error'

describe('SplitwiseError', () => {
  it('should create an error with all properties', () => {
    const err = new SplitwiseError({
      message: 'Something went wrong',
      code: 404,
      cause: 'splitwise',
    })

    expect(err).toBeInstanceOf(Error)
    expect(err).toBeInstanceOf(SplitwiseError)
    expect(err.name).toBe('SplitwiseTSError')
    expect(err.message).toBe('Something went wrong')
    expect(err.code).toBe(404)
    expect(err.cause).toBe('splitwise')
  })

  it('should default code to 500 and cause to splitwise', () => {
    const err = new SplitwiseError({ message: 'test' })
    expect(err.code).toBe(500)
    expect(err.cause).toBe('splitwise')
  })

  it('should default message to empty string', () => {
    const err = new SplitwiseError({ message: '' })
    expect(err.message).toBe('')
  })
})

describe('createError', () => {
  it('should create error from string input', () => {
    const err = createError('Something failed')
    expect(err).toBeInstanceOf(SplitwiseError)
    expect(err.message).toBe('Something failed')
  })

  it('should return existing SplitwiseError unchanged', () => {
    const original = new SplitwiseError({
      message: 'original',
      code: 418,
      cause: 'auth',
    })
    const result = createError(original)
    expect(result).toBe(original)
  })

  it('should create error from partial input object', () => {
    const err = createError({ message: 'partial error', code: 403 })
    expect(err).toBeInstanceOf(SplitwiseError)
    expect(err.message).toBe('partial error')
    expect(err.code).toBe(403)
  })

  it('should handle input without message gracefully', () => {
    const err = createError({})
    expect(err).toBeInstanceOf(SplitwiseError)
    expect(err.message).toBe('')
  })

  it('should extract statusCode from FetchError-like objects', () => {
    const fetchError = {
      message: 'Not Found',
      statusCode: 404,
      statusMessage: 'Not Found',
    }
    const err = createError(fetchError as any)
    expect(err.code).toBe(404)
    expect(err.message).toBe('Not Found')
  })

  it('should fallback to statusMessage when message is missing', () => {
    const fetchError = {
      statusMessage: 'Bad Request',
      statusCode: 400,
    }
    const err = createError(fetchError as any)
    expect(err.message).toBe('Bad Request')
  })
})
