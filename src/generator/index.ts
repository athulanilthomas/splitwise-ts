import { readFile, writeFile } from 'node:fs/promises'
import { cwd } from 'node:process'
import { astToString, default as openApiTs } from 'openapi-typescript'
import { resolve } from 'pathe'
import { generatePayload, loadPrerequisites } from './helper'

import clientRenderer from './client.renderer'
import typesRenderer from './types.renderer'

import type Handlebars from 'handlebars'

/**
 * TODO: Add Renderer typings
 */
const compileAndFormat = async (instance: typeof Handlebars, payload: Record<string, any>, file: string) => {
  const contents = await readFile(resolve(__dirname, file), { encoding: 'utf-8' })
  const template = instance.compile(contents)
  const compiledResult = template(payload)

  return compiledResult
}

const run = async (filename = '') => {
  const resolvedPath = resolve(cwd(), filename)
  const spec = await readFile(resolvedPath, 'utf8').then(JSON.parse)

  const prerequisites = await loadPrerequisites(spec)
  const payload = generatePayload(prerequisites)

  const types = await openApiTs(spec)
  const typeString = astToString(types)

  const clientResult = await compileAndFormat(clientRenderer, payload, './client.template.ts')
  const typesResult = await compileAndFormat(
    typesRenderer,
    { openApiTypeString: typeString, operations: prerequisites.operations },
    './types.template.ts',
  )

  await writeFile('./src/lib/core/client.ts', clientResult)
  await writeFile('./src/lib/types/splitwise.ts', typesResult)
}

export { run }
