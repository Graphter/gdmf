import { createAtomStore } from './createAtomStore';
import { PathSegment } from '../PathSegment';
import { pathLayerToKey } from '../utils/pathUtils';
import { NodeConfig } from '../NodeConfig';
import stringify from 'fast-json-stable-stringify'

export const internalNodeDataStore = createAtomStore<[ Array<PathSegment>, NodeConfig, string ], any>(
  'internalNodeDataStore',
  (path, config, layer) => `${pathLayerToKey(path, layer)}-config:${stringify(config)}`
)
