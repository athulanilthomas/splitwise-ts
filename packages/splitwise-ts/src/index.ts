export { splitwisify } from './lib/core/helpers'
export { Client } from './lib/core/client'
export { OAuth2User } from './lib/auth/OAuth2User'
export { SplitwiseError, createError } from './lib/utils/error'

// Re-export types for consumer use
export type { AuthClient, OAuthCredentials, UseAuthResponse } from './lib/types/auth'
export type { RestOptions } from './lib/types/request'
export type { SplitwiseErr } from './lib/types/error'
export type { OperationQueryParams, OperationRequestBodyContent, Primitive } from './lib/types/utils'
