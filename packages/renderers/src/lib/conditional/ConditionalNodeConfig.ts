import { NodeConfig, PathTraversalSegment } from '@gdmf/ui-core';


export interface ConditionalNodeConfig extends NodeConfig {
  branches: Map<string, NodeConfig>,
  targetPathQuery: Array<PathTraversalSegment>
}
