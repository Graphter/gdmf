export const objectRendererConfig = {
  id: 'object-renderer-config',
  type: 'transparent-object',
  properties: [
    {
      name: 'Properties',
      config: {
        id: 'properties',
        type: 'list',
        itemConfig: {
          id: 'property',
          type: 'object',
          properties: [
            {
              name: 'Name',
              config: {
                id: 'name',
                type: 'text'
              }
            },
            {
              name: 'Description',
              config: {
                id: 'description',
                type: 'text'
              }
            },
            {
              config: {
                id: 'nested-config',
                type: 'nested',
                nestedConfigId: 'config'
              }
            }
          ]
        },
        titlePath: [ 'name' ],
        descriptionPath: [ 'description' ]
      }
    }
  ]
};
