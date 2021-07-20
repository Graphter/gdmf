import { NodeConfig } from '@gdmf/ui-core';


export interface ObjectNodeConfig extends NodeConfig {
  properties: Array<NodeConfig>
}
