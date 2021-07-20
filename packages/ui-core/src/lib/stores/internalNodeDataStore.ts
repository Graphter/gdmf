import { createAtomStore } from './createAtomStore';
import { PathSegment } from '../PathSegment';
import { pathLayerToKey } from '../utils/pathUtils';
import { NodeConfig } from '../NodeConfig';

export const internalNodeDataStore = createAtomStore<[ Array<PathSegment>, NodeConfig, string ], any>(
  'internalNodeDataStore',
  (path, config, layer) => `${pathLayerToKey(path, layer)}-config:${config.id}`
)