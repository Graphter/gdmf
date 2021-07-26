export const configModel = {
  id: 'config',
  type: 'object',
  properties: [
    {
      name: 'id',
      description: 'An identifier for the config.',
      config: {
        id: 'id',
        type: 'text'
      }
    },
    {
      name: 'type',
      description: 'The renderer type. Must be one of those registered on init.',
      config: {
        id: 'type',
        type: 'text'
      }
    },
    {
      name: 'Node Config',
      config: {
        id: 'rendererSpecificProperties',
        type: 'dynamic-nested',
        configServiceId: 'config',
        targetPathQuery: [ { $up: 1 }, 'type' ]
      }
    }
  ]
}
