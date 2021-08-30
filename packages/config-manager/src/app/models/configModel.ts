export const configModel = {
  id: 'config',
  type: 'object',
  properties: [
    {
      name: 'ID',
      description: 'An identifier for the config.',
      config: {
        id: 'id',
        type: 'text'
      }
    },
    {
      name: 'Renderer Type',
      description: 'The renderer type. Must be one of those registered on init.',
      config: {
        id: 'type',
        type: 'text'
      }
    },
    {
      config: {
        id: 'nested-config',
        type: 'dynamic-nested',
        configServiceId: 'renderer-config',
        targetPathQuery: [ { $up: 1 }, 'type' ]
      }
    }
  ]
}
