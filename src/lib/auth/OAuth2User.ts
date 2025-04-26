import {
  ClientSecretPost,
  clientCredentialsGrantRequest,
  processClientCredentialsResponse,
  validateAuthResponse,
} from 'oauth4webapi'
import config from '../core/config'
import { createError } from '../utils'

import type { AuthorizationServer, Client, ResponseBodyError } from 'oauth4webapi'
import type { AuthClient, OAuthCredentials, UseAuthResponse } from '../types/auth'

export class OAuth2User implements AuthClient {
  protected token?: string
  #options?: OAuthCredentials

  constructor(credentials: OAuthCredentials) {
    this.#options = credentials
  }

  public get accessToken(): string | null {
    return this.token ?? null
  }

  async requestAccessToken(): Promise<UseAuthResponse> {
    if (!this.#options?.clientId || !this.#options?.clientSecret) {
      throw createError({
        cause: 'auth',
        message: 'Both clientId and clientSecret is required',
        code: 401,
      })
    }
    const { clientId, clientSecret } = this.#options
    const client: Client = { client_id: clientId }
    const as: AuthorizationServer = config
    const params = validateAuthResponse(as, client, new URLSearchParams())
    const clientAuth = ClientSecretPost(clientSecret)
    try {
      const response = await clientCredentialsGrantRequest(as, client, clientAuth, params)
      const token = await processClientCredentialsResponse(as, client, response)
      this.token = token.access_token
      return { access_token: this.token }
    } catch (e: unknown) {
      const responseError = e as ResponseBodyError
      const cause = responseError?.error
      const code = responseError?.status

      throw createError({
        cause: 'auth',
        code,
        message: cause,
      })
    }
  }
}
