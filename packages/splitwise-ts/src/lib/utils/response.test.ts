import { describe, expect, it } from 'vitest'
import { makeResponse } from './response'
import { SplitwiseError } from './error'

describe('makeResponse', () => {
  it('should return resolved value from a successful promise', async () => {
    const data = { user: { id: 1, name: 'Ada' } }
    const result = await makeResponse(Promise.resolve(data))
    expect(result).toEqual(data)
  })

  it('should wrap rejected error into SplitwiseError', async () => {
    const originalError = new Error('Network failure')
    await expect(makeResponse(Promise.reject(originalError))).rejects.toBeInstanceOf(SplitwiseError)
  })

  it('should wrap string rejection into SplitwiseError', async () => {
    await expect(makeResponse(Promise.reject('something went wrong'))).rejects.toBeInstanceOf(SplitwiseError)
  })

  it('should preserve SplitwiseError when re-thrown', async () => {
    const original = new SplitwiseError({
      message: 'Auth failed',
      code: 401,
      cause: 'auth',
    })

    try {
      await makeResponse(Promise.reject(original))
      expect.unreachable('should have thrown')
    } catch (err) {
      expect(err).toBeInstanceOf(SplitwiseError)
      expect((err as SplitwiseError).message).toBe('Auth failed')
      expect((err as SplitwiseError).code).toBe(401)
    }
  })

  it('should handle null/undefined resolved values', async () => {
    expect(await makeResponse(Promise.resolve(null))).toBeNull()
    expect(await makeResponse(Promise.resolve(undefined))).toBeUndefined()
  })
})
