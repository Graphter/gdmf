import { PathSegment } from './PathSegment';
import { NodeConfig } from './NodeConfig';

export interface NodeMeta {
  path: Array<PathSegment>,
  layer: string,
  config: NodeConfig
}