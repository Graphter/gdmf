import { NodeConfig, PathTraversalSegment } from '@gdmf/ui-core';

export interface DynamicNestedNodeConfig extends NodeConfig {
  configServiceId: string,
  targetPathQuery: Array<PathTraversalSegment>
}
