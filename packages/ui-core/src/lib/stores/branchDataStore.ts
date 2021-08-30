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
import { NodeMetaData } from './NodeMetaData';

const treeDataMap: Map<string, RecoilValueReadOnly<unknown>> = new Map()

const get = <T>(startingPath: Array<PathSegment>, depth?: number): RecoilValueReadOnly<T> => {
  if (!startingPath) throw new Error('Path is required to get descendent data')
  const key = pathToKey(startingPath)
  let treeDataSelector = treeDataMap.get(key)
  if (treeDataSelector) return treeDataSelector as RecoilValueReadOnly<T>

  treeDataSelector = selector<T | null>({
    key: nanoid(),
    get: ({get}) => {
      function getNodeMetaData(path: Array<PathSegment>): Array<NodeMetaData> {
        const pathConfigsState = pathConfigsStore.get(path)
        const pathConfigs = get(pathConfigsState)
        if(!pathConfigs?.length) throw new Error(`Couldn't find paths at '${path.join('/')}'`)

        /**
         * Gets child data for a config
         * @param config - the last config in a nodes configs. This node is the one that could have child paths. The rest are transparent.
         */
        function getChildMetaData(config: NodeConfig): Array<NodeMetaData>{
          const layerState = pathLayerStore.get(path, config)
          const layer = get(layerState)
          if(typeof layer === 'undefined') return []
          if(!childPathStore.has(path, layer)) return []
          const childPathsState = childPathStore.get(path, layer)
          const childPaths = get(childPathsState)
          if(typeof childPaths === 'undefined' || childPaths.length === 0) return []
          // Child data may come back in array form for transparent merges
          return childPaths.flatMap(childPath => {
            const children = getNodeMetaData(childPath)
            return Array.isArray(children) ? children : [ children ]
          })
        }

        const childMetaData = getChildMetaData(pathConfigs[pathConfigs.length - 1])
        // transform from the bottom most path node -> up
        const nodeMetaData = [ ...pathConfigs ].reverse().reduce<Array<NodeMetaData>>((a, c) => {
          const layerState = pathLayerStore.get(path, c)
          const layer = get(layerState)
          if(typeof layer === 'undefined') return a
          const internalDataState = internalNodeDataStore.get(path, c, layer)
          const internalData = get<unknown>(internalDataState)
          if(a?.length){
            const rendererReg = rendererRegStore.get(c.type)
            if (!rendererReg.mergeChildData){
              return [ { config: c, data: internalData } ]
            }
            else{
              const mergeResult = rendererReg.mergeChildData(c, a)
              return Array.isArray(mergeResult) ? mergeResult : [ mergeResult ]
            }
          } else{
            return typeof internalData === 'undefined' ? a : [ { config: c, data: internalData } ]
          }
        }, childMetaData)
        console.log({ path: path.join('/'), externalNodeData: nodeMetaData })
        return nodeMetaData
      }

      const nodeData = getNodeMetaData(startingPath)
      return nodeData.length ? nodeData[0].data as T : null // Not great but hard to see what else to do here
    }
  });
  treeDataMap.set(key, treeDataSelector)

  return treeDataSelector as RecoilValueReadOnly<T>
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
