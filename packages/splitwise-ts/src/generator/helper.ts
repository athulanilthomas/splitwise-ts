import { $RefParser } from '@apidevtools/json-schema-ref-parser'

import type {
  OpenAPI3,
  OperationObject,
  ParameterObject,
  PathItemObject,
  PathsObject,
  TagObject,
} from 'openapi-typescript'

type Spec = OpenAPI3 & {
  tags: Record<string, any>
  components: Record<string, any>
  info: Record<string, any>
}

type ParamWithType = {
  name: string
  tsType: string
}

type ClassDefinitions = Record<
  string,
  {
    functions: {
      id: string
      args: ParamWithType[]
      isRequestBodyPresent: boolean
      isQueryParamsPresent: boolean
      method: keyof PathItemObject
      endpoint: string
    }[]
  }
>

type Prerequisites = {
  classes: ClassDefinitions
  operations: string[]
}

const SCHEMA_TYPE_TO_TS: Record<string, string> = {
  integer: 'number',
  number: 'number',
  string: 'string',
  boolean: 'boolean',
}

function extractParams(arr: ParameterObject[]): ParamWithType[] {
  return (
    arr?.map((param) => ({
      name: param?.name ?? '',
      tsType: SCHEMA_TYPE_TO_TS[(param?.schema as Record<string, any>)?.type as string] ?? 'string',
    })) ?? []
  )
}

function isRequestBodyPresent(reqBody: OperationObject['requestBody']) {
  return !!reqBody
}

function generatePrerequisites(paths: PathsObject | undefined, tagCollection: TagObject[] & Record<string, any>) {
  if (!paths) throw new Error('Invalid paths')

  const operationIds: string[] = []

  const classes = tagCollection.reduce((prev: any, next: { name: string }) => {
    const name = next.name.toLowerCase()
    return {
      ...prev,
      [name]: { functions: [], ...next },
    }
  }, {})

  const httpMethods = new Set(['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'])

  Object.keys(paths).forEach((pathKey) => {
    const endpointPath = paths[pathKey] as PathItemObject

    Object.keys(endpointPath).forEach((methodKey) => {
      if (!httpMethods.has(methodKey)) return

      const method = endpointPath[methodKey as keyof PathItemObject] as OperationObject & Record<string, any>
      const { operationId, parameters: params, requestBody, tags } = method

      if (!operationId) throw new Error(`No operationId found for path: ${pathKey} method: ${methodKey}`)

      const parameters = endpointPath['parameters'] || params
      const queryVariables = extractParams(
        parameters?.filter((x) => 'in' in x && x.in === 'query') as ParameterObject[],
      )
      const pathObject = (parameters?.filter((x) => 'in' in x && x.in === 'path') as ParameterObject[]) ?? []
      const pathVariables = extractParams(pathObject)

      const argComments = pathObject.map((path) => ({
        name: path.name?.trim(),
        description: path.description?.trim() || '',
      }))

      const isQueryVariablesPresent = !!queryVariables.length

      operationIds.push(operationId)

      if (!tags?.length) throw new Error(`No tags found for operation: ${operationId}`)

      const tag = tags[0].toLowerCase()

      classes[tag].functions.push({
        id: operationId,
        args: pathVariables,
        argComments: argComments,
        isRequestBodyPresent: isRequestBodyPresent(requestBody),
        isQueryParamsPresent: isQueryVariablesPresent,
        method: methodKey,
        endpoint: pathKey,
      })
    })
  })

  return { classes, operations: operationIds }
}

export async function loadPrerequisites(spec: Spec) {
  await $RefParser.dereference(spec)

  const { paths, tags } = spec

  const requirements = generatePrerequisites(paths, tags)

  return requirements as Prerequisites
}

export function generatePayload({ classes, operations }: Prerequisites) {
  const endpoints = {
    endpoints: operations,
  }
  const properties = Object.entries(classes).map(([property, definition]) => {
    return {
      propertyName: property,
      description: `Collection of all functions relates to ${property}`,
      functions: definition.functions,
    }
  })

  return { endpoint_types: endpoints, properties }
}
