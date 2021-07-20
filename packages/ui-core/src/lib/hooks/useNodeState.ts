import { PathSegment } from '../PathSegment';
import { NodeConfig } from '../NodeConfig';
import { internalNodeDataStore } from '../stores/internalNodeDataStore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { NodeState } from './NodeState';
import { childMetasStore } from '../stores/childMetasStore';
import { pathLayerStore } from '../stores/pathLayerStore';

export const useNodeState = <S>(path: Array<PathSegment>, config: NodeConfig): NodeState => {
  const pathLayerState = pathLayerStore.get(path, config)
  const pathLayer = useRecoilValue(pathLayerState)
  const internalDataState = internalNodeDataStore.get(path, config, pathLayer)
  const [ internalData, setInternalData ] = useRecoilState<S>(internalDataState)
  const childMetasState = childMetasStore.get(path, config, pathLayer)
  const childMetas = useRecoilValue(childMetasState)

  return {
    internalData: internalData,
    setInternalData: setInternalData,
    childMetas: childMetas,
    layer: pathLayer
  }

}