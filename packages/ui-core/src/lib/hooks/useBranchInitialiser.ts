import { RecoilValue, Snapshot, useGotoRecoilSnapshot, useRecoilCallback } from 'recoil';
import { PathSegment } from '../PathSegment';
import { createPromiseQueue } from '../utils/createPromiseQueue';
import { NodeConfig } from '../NodeConfig';
import { rendererRegStore } from '../stores/rendererRegStore';
import { internalNodeDataStore } from '../stores/internalNodeDataStore';
import { Initialiser } from '../NodeRendererRegistration';
import { pathLayerStore } from '../stores/pathLayerStore';
import { childPathStore } from '../stores/childPathsStore';
import { pathConfigsStore } from '../stores/pathConfigsStore';
import { pathToKey, pathUtils } from '../utils/pathUtils';
import { defaultUtils } from '../utils/defaultUtils';
import { branchDataStore } from '../stores/branchDataStore';
import * as Path from 'path';
import { configUtils } from '../utils/configUtils';

export interface StateUpdate {
  path: Array<PathSegment>,
  config: NodeConfig,
  layer:string,
  value: unknown
}

const branchInitQueue = createPromiseQueue<
  void,
  [
    Array<PathSegment>,
    NodeConfig,
    string,
    any,
    Array<StateUpdate> | undefined
  ]>()

const defaultInitialiser: Initialiser = async (
  {
    path,
    config,
    parentLayer,
    getInternalData,
    getBranchData
  }
) => {
  let internalData = await getInternalData(parentLayer)
  if(typeof internalData === 'undefined') {
    internalData = await getBranchData(path)
  }
  const defaultedBranchData = await defaultUtils.valueOrDefaultOrNull<any>(config, internalData)
  return {
    layer: parentLayer,
    internalData: defaultedBranchData,
  }
}

export const useBranchInitialiser = () => {
  const gotoSnapshot = useGotoRecoilSnapshot();
  const init = useRecoilCallback(
    ({snapshot}) => async (
      path: Array<PathSegment>,
      config: NodeConfig,
      parentLayer: string,
      originalTreeData: any,
      internalDataUpdates?: Array<StateUpdate>
    ) => {
      const newSnapshot = await snapshot.asyncMap(async (mutableSnapshot) => {

        async function initialiseNode(path: Array<PathSegment>, config: NodeConfig, layer: string) {
          const rendererReg = rendererRegStore.get(config.type)

          // Init
          const initResult = await (rendererReg.initialiser || defaultInitialiser)({
            path,
            config,
            parentLayer: layer,
            getBranchData: async (path) => {
              if(originalTreeData) {
                const originalValue = pathUtils.getValueByGlobalPath(originalTreeData, path)
                return originalValue
              }
              if(branchDataStore.has(path))
                return await mutableSnapshot.getPromise(branchDataStore.get(path))
            },
            getInternalData: async (layer) => {
              if(originalTreeData) return
              if(!internalNodeDataStore.has(path, config, layer)) return
              const internalDataState = internalNodeDataStore.get(path, config, layer)
              const internalData = await mutableSnapshot.getPromise(internalDataState)
              return internalData
            }
          })

          // Active path layer
          if(!pathLayerStore.has(path, config)){
            pathLayerStore.set(initResult.layer, path, config)
          }
          console.log(`Setting Layer for path: '${path.join('/')}'`, initResult.layer)
          mutableSnapshot.set(pathLayerStore.get(path, config), initResult.layer)

          // Internal data
          if(!internalNodeDataStore.has(path, config, initResult.layer)){
            internalNodeDataStore.set(initResult.internalData, path, config, initResult.layer)
          }
          console.log(`Setting Internal data for path: '${path.join('/')}', config: '${config.id}', layer: '${initResult.layer}'`, initResult.internalData)
          mutableSnapshot.set(internalNodeDataStore.get(path, config, initResult.layer), initResult.internalData)

          // Path hierarchy
          const pathKey = pathToKey(path)
          const isTransparentRenderer = initResult.children?.some(child => pathToKey(child.path) === pathKey)
          const childPaths = isTransparentRenderer ? [] : initResult.children?.map(child => child.path) || []
          if(!childPathStore.has(path, initResult.layer)){
            childPathStore.set(childPaths, path, initResult.layer)
          }
          console.log(`Setting Child paths for path: '${path.join('/')}', layer: '${initResult.layer}'`, childPaths)
          mutableSnapshot.set(childPathStore.get(path, initResult.layer), childPaths)

          // Path configs
          if (!pathConfigsStore.has(path)) {
            pathConfigsStore.set([ config ], path)
          }
          const pathConfigsState = pathConfigsStore.get(path)
          const pathConfigs = await mutableSnapshot.getPromise(pathConfigsState)
          const configIndex = configUtils.findIndex(pathConfigs, config)

          if(configIndex < pathConfigs.length -1) {
            if(configIndex === -1 && pathConfigs.some(pathConfigs => pathConfigs.id === config.id)){
              throw new Error(`Found two configs with the same ID '${config.id}' within the same data node. For now, each config within a data node must have a unique ID.`)
            }
            const newPathConfigs = configIndex === -1 ?
              [ ...pathConfigs, config ] :
              pathConfigs.slice(0, configIndex + 1)
            console.log(`Setting Path configs for path: '${path.join('/')}', layer: '${initResult.layer}'`, newPathConfigs)
            mutableSnapshot.set(pathConfigsState, newPathConfigs)
          }


          // Init children
          if (initResult.children) {
            await Promise.all(initResult.children.map(child => initialiseNode(child.path, child.config, initResult.layer)))
          }
        }

        // Apply any updates
        if(internalDataUpdates?.length){
          internalDataUpdates.forEach(update => {
            const internalDataState = internalNodeDataStore.get(update.path, update.config, update.layer)
            mutableSnapshot.set(internalDataState, update.value)
          })
        }

        await initialiseNode(path, config, parentLayer)
      })
      // TODO: See if we can do this only when there are no more items in the queue to process in order to prevent unnecessary re-renders
      gotoSnapshot(newSnapshot)
    })

  return async (
    path: Array<PathSegment>,
    config: NodeConfig,
    parentLayer: string,
    originalTreeData?: any,
    stateUpdates?: Array<StateUpdate>
  ) => {
    await branchInitQueue.enqueue(init, path, config, parentLayer, originalTreeData, stateUpdates)
  }
}

