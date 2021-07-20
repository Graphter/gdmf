import { RecoilValueReadOnly, selector } from "recoil";
import { pathConfigsStore } from "./pathConfigsStore";
import { PathSegment } from '../PathSegment';
import { pathToKey } from '../utils/pathUtils';
import { childPathStore } from './childPathsStore';
import { pathLayerStore } from './pathLayerStore';
import { internalNodeDataStore } from './internalNodeDataStore';
import { rendererRegStore } from './rendererRegStore';
import { nanoid } from 'nanoid';
import { NodeConfig } from '../NodeConfig';
import internal from 'stream';

const treeDataMap: Map<string, RecoilValueReadOnly<any>> = new Map()

const get = <T>(startingPath: Array<PathSegment>, depth?: number) => {
  if (!startingPath) throw new Error('Path is required to get descendent data')
  const key = pathToKey(startingPath)
  let treeDataSelector = treeDataMap.get(key)
  if (treeDataSelector) return treeDataSelector

  treeDataSelector = selector<T>({
    key: nanoid(),
    get: ({get}) => {
      function getNodeData(path: Array<PathSegment>): any {
        const pathConfigsState = pathConfigsStore.get(path)
        const pathConfigs = get(pathConfigsState)
        if(typeof pathConfigs === 'undefined') return null

        /**
         * Gets child data for a config
         * @param config - the last config in a nodes configs. This node is the one that could have child paths. The rest are transparent.
         */
        function getChildData(config: NodeConfig){
          const layerState = pathLayerStore.get(path, config)
          const layer = get(layerState)
          if(typeof layer === 'undefined') return null
          const childPathsState = childPathStore.get(path, layer)
          const childPaths = get(childPathsState)
          if(typeof childPaths === 'undefined' || childPaths.length === 0) return null
          return childPaths.map(childPath => getNodeData(childPath))
        }

        if(!pathConfigs.length) return null
        const childData = getChildData(pathConfigs[pathConfigs.length - 1])
        // transform from the bottom most path node -> up
        const externalNodeData = [ ...pathConfigs ].reverse().reduce<any>((a, c) => {
          const layerState = pathLayerStore.get(path, c)
          const layer = get(layerState)
          if(typeof layer === 'undefined') return a
          const internalDataState = internalNodeDataStore.get(path, c, layer)
          const internalData = get(internalDataState)
          if(a?.length){
            const rendererReg = rendererRegStore.get(c.type)
            if (!rendererReg.mergeChildData){
              return internalData
            }
            else{
              return rendererReg.mergeChildData(c, a)
            }
          } else{
            return typeof internalData === 'undefined' ? a : internalData
          }

        }, childData)
        console.log({ path: path.join('/'), externalNodeData })
        return externalNodeData
      }

      return getNodeData(startingPath)
    }
  });
  treeDataMap.set(key, treeDataSelector)

  return treeDataSelector
}

const has = (startingPath: Array<PathSegment>) => {
  if (!startingPath) throw new Error('Path is required to get descendent data')
  const key = pathToKey(startingPath)
  return treeDataMap.has(key)
}

export const branchDataStore = {
  get,
  has
}
