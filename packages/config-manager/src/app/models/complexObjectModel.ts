export const complexObjectModel = {
  id: 'complex-object',
  type: 'object',
  createDefault: () => ({}),
  properties: [
    {
      id: 'name',
      type: 'text',
      createDefault: () => ''
    },
    {
      id: 'location',
      type: 'text',
      createDefault: () => ''
    },
    {
      id: 'name-conditional',
      type: 'conditional',
      branches: new Map<string, any>([
        [
          'bob1', {
            id: 'bob1',
            type: 'list',
            itemConfig: {
              id: 'bob',
              type: 'text',
              createDefault: () => ''
            }
          }
        ],
        [
          'bob2', {
          id: 'bob2',
          type: 'list',
          itemConfig: {
            id: 'bob',
            type: 'text',
            createDefault: () => ''
          }
        }
        ]
      ]),
      targetPathQuery: [ {$up: 1}, 'name' ]
    },
    {
      id: 'addresses',
      type: 'list',
      itemConfig: {
        id: 'address',
        type: 'text',
        createDefault: () => ''
      }
    }
  ]
}