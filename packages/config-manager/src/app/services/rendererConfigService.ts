import {
  configStore,
  NodeConfig,
  PathSegment, rendererRegStore,
  Service
}
  from '@gdmf/ui-core';

/**
 * Provides access to renderer config. Necessary to allow the user to manage specific renderer config.
 */
export const rendererConfigService: Service<NodeConfig, string> = {
  get: (type: string) => {
    if(!rendererRegStore.has(type)){
      return Promise.resolve({
        item: null
      })
    }
    const renderer = rendererRegStore.get(type)
    const rendererConfig = renderer.config
    return Promise.resolve({
      item: rendererConfig || null
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
