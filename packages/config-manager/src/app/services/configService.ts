import {
  configStore,
  NodeConfig,
  PathSegment,
  Service
}
  from '@gdmf/ui-core';

/**
 * Stores all the known configs
 */
export const configService: Service<NodeConfig> = {
  get: (configId: PathSegment) => {
    return Promise.resolve({
      item: configStore.get(configId.toString()) || null
    });
  },
  list: () => {
    const items = configStore.getAll()
    return Promise.resolve({
      items,
      count: items.length,
      skip: 0,
      take: 10
    })
  }
};
