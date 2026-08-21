import { isPlainObject } from 'es-toolkit'

type FlattenType = <T extends Record<string, any>>(
  payload: T,
  prefix?: string,
  delimiter?: string,
) => Record<string, any>

export const flatten: FlattenType = (payload, prefix = '', delimiter = '_') => {
  const result: Record<string, any> = {}
  const keys = Object.keys(payload)

  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx] as string
    const value = payload[key]
    const prefixedKey = prefix ? `${prefix}${delimiter}${key}` : key

    if (isPlainObject(value) && Object.keys(value).length > 0) {
      Object.assign(result, flatten(value, prefixedKey, delimiter))
      continue
    }

    if (Array.isArray(value)) {
      Object.assign(result, flatten(value, prefixedKey, delimiter))
      continue
    }

    result[prefixedKey] = value
  }

  return result
}
