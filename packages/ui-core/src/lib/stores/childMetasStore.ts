import { PathSegment } from '../PathSegment';
import { pathLayerToKey } from '../utils/pathUtils';
import { RecoilValueReadOnly, selector } from 'recoil';
import { nanoid } from 'nanoid';
import { childPathStore } from './childPathsStore';
import { pathLayerStore } from './pathLayerStore';
import { pathConfigsStore } from './pathConfigsStore';
import { NodeMeta } from '../NodeMeta';
import { NodeConfig } from '../NodeConfig';

const childPathConfigsMap = new Map<string, RecoilValueReadOnly<Array<NodeMeta>>>()

const pathConfigLayerToKey = (path: Array<PathSegment>, config: NodeConfig, layer: string) =>
  `config:${config.id}-bf3ad41b-16f2-4715-9a10-c2c496204320-${pathLayerToKey(path, layer)}`

const get = (path: Array<PathSegment>, config: NodeConfig, layer: string) => {
  const key = pathConfigLayerToKey(path, config, layer)
  if(!childPathConfigsMap.has(key)){
    childPathConfigsMap.set(key, selector({
      key: nanoid(),
      get: ({ get }) => {
        const pathConfigsState = pathConfigsStore.get(path)
        const pathConfigs = get(pathConfigsState)
        const childPathsState = childPathStore.get(path, layer)
        const childPaths = get(childPathsState)

        if(pathConfigs.length > 1){
          // Handle transparent renderers
          const pathConfigIndex = pathConfigs.findIndex(pathConfig => pathConfig.id === config.id)
          if(pathConfigIndex > -1 && pathConfigIndex < pathConfigs.length - 1){
            return [
              {
                path,
                layer,
                config: pathConfigs[pathConfigIndex + 1]
              }
            ]
          }
        }

        return childPaths.map(childPath => {
          const childConfigsState = pathConfigsStore.get(childPath)
          const childConfigs = get(childConfigsState)
          const firstConfig = childConfigs[0]
          const activeChildLayerState = pathLayerStore.get(childPath, firstConfig)
          const activeChildLayer = get(activeChildLayerState)
          return {
            path: childPath,
            layer: activeChildLayer,
            config: firstConfig
          }
        })
      }
    }))
  }
  return childPathConfigsMap.get(key) as RecoilValueReadOnly<Array<NodeMeta>>
}

export const childMetasStore = {
  get,
}