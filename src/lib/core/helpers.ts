import { isPrimitive, mapValues } from 'es-toolkit'
import { flatten } from '../utils'

import type { Primitive } from '../types/utils'

type NestedRecord = Record<string, Primitive>
type SplitwisifyPayload = Record<string, Primitive | NestedRecord[]>
type Splitwisify = <T extends SplitwisifyPayload>(body: T) => Record<string, Primitive>

/**
 * Flattens a nested object structure into a format suitable for Splitwise.
 *
 * This function takes an object with potentially nested properties and flattens
 * it into a single-level object where nested keys are concatenated with underscores.
 *
 * @example
 * splitwisify({
 *   message: "This is an expense",
 *   paid: "234",
 *   users: [
 *    { id: '0', description: 'Salad' },
 *    { id: '1', description: 'Pizza' },
 *    { id: '2', description: 'Again Salad' }
 *   ]
 * })
 *
 * // Returns
 * {
 *   message: "This is an expense",
 *   paid: "234",
 *   users_0_id: '0',
 *   users_0_description: 'Salad',
 *   users_1_id: '1',
 *   users_1_description: 'Pizza',
 *   users_2_id: '2',
 *   users_2_description: 'Again Salad'
 * }
 */
export const splitwisify: Splitwisify = (input) => {
  const flattened = flatten(input)
  const mapped = mapValues(flattened, (value) => (isPrimitive(value) ? value : ''))
  return mapped
}
