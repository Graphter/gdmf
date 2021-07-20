import { NodeMeta } from '../NodeMeta';

export interface NodeState {
  internalData: any,
  setInternalData: (newValue: any, reInitialise?: boolean) => Promise<void>,
  childMetas: Array<NodeMeta>,
  layer: string
}
