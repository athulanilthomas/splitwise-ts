import { createError } from './error'

export const makeResponse = async <R>(promise: Promise<R>) => {
  try {
    return await promise
  } catch (error: any) {
    throw createError(error)
  }
}
