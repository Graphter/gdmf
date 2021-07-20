import { NestedNodeConfig } from './NestedNodeConfig';
import { NodeConfig } from '@gdmf/ui-core';

export function isNestedNodeConfig (config: NodeConfig): asserts config is NestedNodeConfig {
  const nestedNodeConfig = config as NestedNodeConfig
  if(!nestedNodeConfig.nestedConfigId)
    throw new Error(`NestedNodeConfig '${JSON.stringify(config)}' is missing the nestedConfigId property`)
}
