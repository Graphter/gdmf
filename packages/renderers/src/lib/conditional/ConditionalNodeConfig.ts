import { NodeConfig, PathQuerySegment } from '@gdmf/ui-core';


export interface ConditionalNodeConfig extends NodeConfig {
  branches: Map<string, NodeConfig>,
  targetPathQuery: Array<PathQuerySegment>
}
