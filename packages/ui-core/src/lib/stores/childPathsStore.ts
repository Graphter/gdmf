import { createAtomStore } from './createAtomStore';
import { PathSegment } from '../PathSegment';
import { pathLayerToKey, pathToKey } from '../utils/pathUtils';

export const childPathStore =
  createAtomStore<[ Array<PathSegment>, string ], Array<Array<PathSegment>>>(
    'childPathStore',
    pathLayerToKey
  )