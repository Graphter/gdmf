import { ConditionalNodeConfig } from './ConditionalNodeConfig';
import { NodeConfig } from '@gdmf/ui-core';

export function isConditionalConfig(config: NodeConfig): asserts config is ConditionalNodeConfig {
  const conditionalConfig = config as any
  const isConditionalConfig = (conditionalConfig.branches instanceof Map) &&
    conditionalConfig.branches.size > 0 &&
    Array.isArray(conditionalConfig.targetPathQuery) &&
    conditionalConfig.targetPathQuery.length > 0
  if(!isConditionalConfig) throw new Error(`Invalid conditional config ${JSON.stringify(conditionalConfig)}`)
}
