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

export interface AuthClient {
  /**
   * Getter for retrieving access token.
   */
  readonly accessToken: string | null

  /**
   * Requests an access token from the authentication provider.
   * @returns A promise that resolves with the token endpoint response.
   */
  requestAccessToken(): Promise<UseAuthResponse>
}
