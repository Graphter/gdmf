import { NodeConfig } from '@gdmf/ui-core';

export interface PropertyConfig {
  name: string,
  description?: string,
  config: NodeConfig
}

export interface ObjectNodeConfig extends NodeConfig {
  properties: Array<PropertyConfig>
}
