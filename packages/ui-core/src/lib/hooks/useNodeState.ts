import { PathSegment } from '../PathSegment';
import { NodeConfig } from '../NodeConfig';
import { internalNodeDataStore } from '../stores/internalNodeDataStore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { NodeState } from './NodeState';
import { childMetasStore } from '../stores/childMetasStore';
import { pathLayerStore } from '../stores/pathLayerStore';
import { useBranchInitialiser } from './useBranchInitialiser';

export const useNodeState = <S>(path: Array<PathSegment>, config: NodeConfig): NodeState => {
  const initialiser = useBranchInitialiser()
  const pathLayerState = pathLayerStore.get(path, config)
  const pathLayer = useRecoilValue(pathLayerState)
  const internalDataState = internalNodeDataStore.get(path, config, pathLayer)
  const [ internalData, setInternalData ] = useRecoilState<S>(internalDataState)
  const childMetasState = childMetasStore.get(path, config, pathLayer)
  const childMetas = useRecoilValue(childMetasState)

  return {
    internalData: internalData,
    setInternalData: async (newValue, reInitialise= false) => {
      if(reInitialise){
        await initialiser(path, config, pathLayer, undefined, [
          {
            path,
            config,
            layer: pathLayer,
            value: newValue,
          }
        ])
      } else {
        setInternalData(newValue)
      }
    },
    childMetas: childMetas,
    layer: pathLayer
  }

}
