import handlebars from 'handlebars'

handlebars.registerHelper('generateImport', (items, moduleName) => {
  const itemsString = items.join(',     ')
  return `import { ${itemsString} } from '${moduleName}'`
})

handlebars.registerHelper('formatParams', (params) => JSON.stringify(params, null, 2))

handlebars.registerHelper('arguments', (id, args, isParamsPresent, isRequestBodyPresent) => {
  const params = args.map((content: string) => `${content}: string`)

  if (isParamsPresent) params.push(`params: OperationQueryParams<${id}>`)
  if (isRequestBodyPresent) params.push(`request_body: OperationRequestBodyContent<${id}>`)

  return params.join(',\n')
})

handlebars.registerHelper('formatEndpoint', function (options) {
  const formatted = options.fn(this).replace(/{/g, '${')
  return `\`${formatted}\``
})

handlebars.registerPartial(
  'functionTemplate',
  `
    /**
     * @name {{ id }}
     * {{#each argComments}}
     * @param {{ this.name }} {{ this.description }}
     * {{~/each}}
    */
    {{id}}: ({{{ arguments id args isQueryParamsPresent isRequestBodyPresent }}}) => rest<{{id}}>({
        ...this.#defaultRequestOptions,
        endpoint: {{#formatEndpoint}}{{endpoint}}{{/formatEndpoint}},
        {{~#if isQueryParamsPresent}} params: params, {{~/if~}}
        {{~#if isRequestBodyPresent}} requestBody: request_body, {{~/if~}}
        method: '{{method}}'
    }),
`,
)

handlebars.registerPartial(
  'propertyTemplate',
  `
    // {{ description }}

    public readonly {{propertyName}} = {
        {{#each functions}}
            {{> functionTemplate name=this.name description=this.description details=this.details endpoint=this.endpoint method=this.method params=this.params}}
        {{/each}}
    };
`,
)

export default handlebars
