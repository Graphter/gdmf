import { PathSegment } from '../PathSegment';
import { pathLayerToKey } from '../utils/pathUtils';
import { RecoilValueReadOnly, selector } from 'recoil';
import { nanoid } from 'nanoid';
import { childPathStore } from './childPathsStore';
import { pathLayerStore } from './pathLayerStore';
import { pathConfigsStore } from './pathConfigsStore';
import { NodeMeta } from '../NodeMeta';
import { NodeConfig } from '../NodeConfig';
import { configUtils } from '../utils/configUtils';
import stringify from 'fast-json-stable-stringify'

const childPathConfigsMap = new Map<string, RecoilValueReadOnly<Array<NodeMeta>>>();

const pathConfigLayerToKey = (path: Array<PathSegment>, config: NodeConfig, layer: string) =>
  `config:${stringify(config)}-bf3ad41b-16f2-4715-9a10-c2c496204320-${pathLayerToKey(path, layer)}`;

const get = (path: Array<PathSegment>, config: NodeConfig, layer: string) => {
  const key = pathConfigLayerToKey(path, config, layer);
  if (childPathConfigsMap.has(key)) return childPathConfigsMap.get(key) as RecoilValueReadOnly<Array<NodeMeta>>;
  const childMetasSelector = selector({
    key: nanoid(),
    get: ({ get }) => {
      const pathConfigsState = pathConfigsStore.get(path);
      const pathConfigs = get(pathConfigsState);
      const childPathsState = childPathStore.get(path, layer);
      const childPaths = get(childPathsState);

      if (pathConfigs.length > 1) {
        // Handle transparent renderers
        const pathConfigIndex = configUtils.findIndex(pathConfigs, config)
        if (pathConfigIndex !== -1 && pathConfigIndex < pathConfigs.length - 1) {
          return [
            {
              path,
              layer,
              config: pathConfigs[pathConfigIndex + 1]
            }
          ];
        }
      }

      return childPaths.map(childPath => {
        const childConfigsState = pathConfigsStore.get(childPath);
        const childConfigs = get(childConfigsState);
        const firstConfig = childConfigs[0];
        const activeChildLayerState = pathLayerStore.get(childPath, firstConfig);
        const activeChildLayer = get(activeChildLayerState);
        return {
          path: childPath,
          layer: activeChildLayer,
          config: firstConfig
        };
      });
    }
  });
  childPathConfigsMap.set(key, childMetasSelector);
  return childMetasSelector
};

export const childMetasStore = {
  get
};
