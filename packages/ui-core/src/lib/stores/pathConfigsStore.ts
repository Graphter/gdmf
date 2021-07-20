import { createAtomStore } from './createAtomStore';
import { PathSegment } from '../PathSegment';
import { NodeConfig } from '../NodeConfig';
import { pathLayerToKey, pathToKey } from '../utils/pathUtils';

export const pathConfigsStore = createAtomStore<[ Array<PathSegment> ], Array<NodeConfig>>(
  'pathConfigsStore',
  pathToKey
)