import { createAtomStore } from './createAtomStore';
import { PathSegment } from '../PathSegment';
import { pathToKey } from '../utils/pathUtils';
import { NodeConfig } from '../NodeConfig';
import stringify from 'fast-json-stable-stringify'

const pathConfigToKey = (path: Array<PathSegment>, config: NodeConfig) => {
  return `${pathToKey(path)}--config:${stringify(config)}[${config.type}]`
}

export const pathLayerStore = createAtomStore<[ Array<PathSegment>, NodeConfig ], string>(
  'pathLayerStore',
  pathConfigToKey
)
