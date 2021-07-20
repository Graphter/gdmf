import { createAtomStore } from './createAtomStore';
import { PathSegment } from '../PathSegment';
import { pathToKey } from '../utils/pathUtils';
import { NodeConfig } from '../NodeConfig';

const pathConfigToKey = (path: Array<PathSegment>, config: NodeConfig) => `${pathToKey}--config:${config.id}[${config.type}]`

export const pathLayerStore = createAtomStore<[ Array<PathSegment>, NodeConfig ], string>(
  'pathLayerStore',
  pathConfigToKey
)