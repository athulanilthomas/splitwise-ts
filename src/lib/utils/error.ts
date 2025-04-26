import type { FetchError } from 'ofetch'
import type { SplitwiseErr } from '../types/error'

export class SplitwiseError extends Error implements SplitwiseErr {
  static __splitwise_error__ = true
  public code
  public cause
  public message

  constructor({ message, code, cause }: SplitwiseErr) {
    super(message)
    this.name = 'SplitwiseTSError'
    this.message = message || ''
    this.code = code || 500
    this.cause = cause || 'splitwise'
  }
}

function isError(input: any): input is SplitwiseErr {
  return input?.constructor?.__splitwise_error__ === true
}

export function createError(input: string | Partial<SplitwiseError>): SplitwiseErr {
  if (typeof input === 'string') {
    return new SplitwiseError({ message: input })
  }

  if (isError(input)) return input

  const statusMessage = input.message ?? (input as FetchError).statusMessage ?? (input as FetchError).statusText

  const err = new SplitwiseError({
    message: statusMessage ?? '',
    cause: (input as SplitwiseErr).cause || 'splitwise',
    code: (input as FetchError).statusCode ?? (input as SplitwiseErr)?.code,
  })

  return err
}
