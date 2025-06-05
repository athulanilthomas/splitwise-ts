import type { TokenEndpointResponse } from 'oauth4webapi'

export type OAuthCredentials = {
  /**
   * The consumer key obtained from the Splitwise dashboard.
   * Used for authenticating API requests via OAuth.
   */
  clientId: string

  /**
   * The consumer secret obtained from the Splitwise dashboard.
   * Used in conjunction with the consumer key for OAuth authentication.
   */
  clientSecret: string
}

export type UseAuthResponse = {
  access_token: string
}

export abstract class AuthClient {
  /**
   * Getter for retrieving access token.
   */
  abstract get accessToken(): string | null

  /**
   * Requests an access token from the authentication provider.
   * @abstract
   * @returns {Promise<TokenEndpointResponse>} - A promise that resolves with the token endpoint response.
   */
  abstract requestAccessToken(): Promise<UseAuthResponse>
}
