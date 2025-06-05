import { isPlainObject } from 'es-toolkit'

type FlattenType = <T extends Record<string, any>>(
  payload: T,
  prefix?: string,
  delimitter?: string,
) => Record<string, any>

export const flatten: FlattenType = (payload, prefix = '', delimitter = '_') => {
  const result: Record<string, string> = {}
  const keys = Object.keys(payload)

  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx] as string
    const value = payload[key]
    const prefixedKey = prefix ? `${prefix}${delimitter}${key}` : key

    if (isPlainObject(value) && Object.keys(value).length > 0) {
      Object.assign(result, flatten(value, prefixedKey))
      continue
    }

    if (Array.isArray(value)) {
      Object.assign(result, flatten(value, prefixedKey))
      continue
    }

    result[prefixedKey] = value
  }

  return result
}
