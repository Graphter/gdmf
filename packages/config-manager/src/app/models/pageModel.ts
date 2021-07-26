export const pageModel = {
  id: 'page',
  type: 'object',
  createDefault: () => ({}),
  properties: [
    {
      name: 'ID',
      description: 'A unique identifier for the page',
      config: {
        id: 'id',
        type: 'text',
        createDefault: () => ''
      }
    },
    {
      name: 'Title',
      description: 'The page description',
      config: {
        id: 'title',
        type: 'text',
        createDefault: () => ''
      }
    },
    {
      name: 'Description',
      description: 'A description of the page',
      config: {
        id: 'description',
        type: 'text',
        createDefault: () => ''
      }
    },
    {
      name: 'Type',
      description: 'The type of page',
      config: {
        id: 'type',
        type: 'text',
        createDefault: () => 'blog'
      }
    },
    {
      name: 'Authors',
      description: 'The authors of the page',
      config: {
        id: 'authors-conditional',
        type: 'conditional',
        branches: new Map<string, any>([
          [
            'blog',
            {
              id: 'blogAuthors',
              type: 'list',
              titlePath: ['name'],
              supplementaryInformationPaths: [
                {
                  name: 'City',
                  path: [ 'address', 'city' ]
                },
                {
                  name: 'Country',
                  path: [ 'address', 'country' ]
                }
              ],
              itemConfig: {
                id: 'blog-author',
                type: 'object',
                createDefault: () => ({}),
                properties: [
                  {
                    name: 'Author name',
                    config: {
                      id: 'name',
                      type: 'text',
                      createDefault: () => ''
                    }
                  },
                  {
                    name: 'Address',
                    config: {
                      id: 'address',
                      type: 'object',
                      createDefault: () => ({}),
                      properties: [
                        {
                          name: 'First Line',
                          config: {
                            id: 'first-line',
                            type: 'text',
                            createDefault: () => ''
                          }
                        },
                        {
                          name: 'Second Line',
                          config: {
                            id: 'second-line',
                            type: 'text',
                            createDefault: () => ''
                          }
                        },
                        {
                          name: 'City',
                          config: {
                            id: 'city',
                            type: 'text',
                            createDefault: () => ''
                          }
                        },
                        {
                          name: 'Post Code',
                          config: {
                            id: 'post-code',
                            type: 'text',
                            createDefault: () => ''
                          }
                        },
                        {
                          name: 'Country',
                          config: {
                            id: 'country',
                            type: 'text',
                            createDefault: () => ''
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        ]),
        targetPathQuery: [ { $up: 1 }, 'type' ]
      }
    },
    {
      name: 'Nested content',
      description: 'Some nested content?',
      config: {
        id: 'nestedContent',
        type: 'nested',
        nestedConfigId: 'simpleText'
      }
    },
    {
      name: 'Content',
      description: 'The page content',
      config: {
        id: 'content',
        type: 'text'
      }
    },
    {
      config: {
        id: 'links',
        type: 'transparent-object',
        createDefault: () => ({}),
        properties: [
          {
            name: 'Image Source',
            config: {
              id: 'imageSource',
              type: 'text',
              createDefault: () => ''
            }
          },
          {
            name: 'Copyright',
            config: {
              id: 'copyright',
              type: 'text',
              createDefault: () => ''
            }
          }
        ]
      }
    }
  ]
};
