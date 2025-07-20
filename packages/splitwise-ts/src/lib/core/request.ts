import { ofetch } from 'ofetch'
import { createError } from '../utils/error'
import { makeResponse } from '../utils/response'

import type { RestOptions, SuccessResponse } from '../types/request'

export const getFetcher = () => {
  return ofetch.create({
    retry: 3,
    retryDelay: 500,
  })
}

export async function rest<T extends Record<string | number, any>>({
  fetcher,
  auth,
  endpoint,
  params,
  requestBody,
  method,
  baseUrl,
}: RestOptions) {
  const accessToken = auth?.accessToken

  if (!accessToken) {
    throw createError({
      cause: 'auth',
      code: 402,
      message: 'Access token is missing',
    })
  }

  const includeBody = ['post', 'put'].includes(method.toLowerCase()) && !!requestBody

  const promise = fetcher(endpoint, {
    baseURL: baseUrl,
    method,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    query: params,
    body: includeBody ? requestBody : undefined,
  })

  return makeResponse<SuccessResponse<T>>(promise)
}
