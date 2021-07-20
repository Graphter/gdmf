export const pageModel = {
  id: 'page',
  type: 'object',
  createDefault: () => ({}),
  properties: [
    {
      id: 'title',
      type: 'text',
      createDefault: () => ''
    },
    {
      id: 'description',
      type: 'text',
      createDefault: () => ''
    },
    {
      id: 'type',
      type: 'text',
      createDefault: () => 'blog'
    },
    {
      id: 'authors',
      type: 'conditional',
      branches: new Map<string, any>([
        [
          'blog', {
            id: 'blog-authors',
            type: 'list',
            itemConfig: {
              id: 'blog-author',
              type: 'object',
              createDefault: () => ({}),
              properties: [
                {
                  id: 'name',
                  type: 'text',
                  createDefault: () => ''
                },
                {
                  id: 'address',
                  type: 'object',
                  createDefault: () => ({}),
                  properties: [
                    {
                      id: 'first-line',
                      type: 'text',
                      createDefault: () => ''
                    },
                    {
                      id: 'second-line',
                      type: 'text',
                      createDefault: () => ''
                    },
                    {
                      id: 'city',
                      type: 'text',
                      createDefault: () => ''
                    },
                    {
                      id: 'post-code',
                      type: 'text',
                      createDefault: () => ''
                    },
                    {
                      id: 'country',
                      type: 'text',
                      createDefault: () => ''
                    },
                  ]
                },
              ]
            }
          }
        ]
      ]),
      targetPathQuery: [ {$up: 1}, 'type' ]
    },
    {
      id: 'nested-content',
      type: 'nested',
      nestedConfigId: 'simple-text'
    },
    {
      id: 'content',
      type: 'text',
    }
  ]
}