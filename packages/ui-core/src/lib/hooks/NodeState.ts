import { NodeMeta } from '../NodeMeta';

export interface NodeState {
  internalData: any,
  setInternalData: (newValue: any) => void,
  childMetas: Array<NodeMeta>,
  layer: string
}