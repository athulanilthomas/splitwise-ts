import type { $Fetch } from 'ofetch'
import type { AuthClient } from '../types/auth'
export type { SuccessResponseJSON as SuccessResponse } from 'openapi-typescript-helpers'

export type RestOptions = {
  fetcher: $Fetch
  auth?: AuthClient
  endpoint: string
  params?: Record<string, any>
  requestBody?: Record<string, any>
  method: string
  baseUrl: string
}
