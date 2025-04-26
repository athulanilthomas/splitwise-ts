export type ClientErrorStatusCode = number

export type SplitwiseErr<M = string> = Partial<Error> & {
  code?: ClientErrorStatusCode
  cause?: 'splitwise' | 'internal' | 'auth'
  message: M
}
