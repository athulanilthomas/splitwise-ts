export type { OperationRequestBodyContent } from 'openapi-typescript-helpers'

export type Primitive = null | undefined | string | number | boolean | symbol | bigint

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type AllOrOneOf<T extends any[]> =
  | UnionToIntersection<T[number]>
  | { [K in keyof T]: T[K] extends infer I ? I : never }[number]

export type OperationQueryParams<T> = 'parameters' extends keyof T
  ? 'query' extends keyof T['parameters']
    ? T['parameters']['query']
    : never
  : never

export type InferGuardedType<Fn> = Fn extends (a: any, ...args: any[]) => a is infer T ? T : never
