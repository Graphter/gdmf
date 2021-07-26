import { NodeConfig } from '@gdmf/ui-core';
import { DynamicNestedNodeConfig } from './DynamicNestedNodeConfig';

export function isDynamicNestedNodeConfig(config: NodeConfig): asserts config is DynamicNestedNodeConfig {
  const objectConfig = config as DynamicNestedNodeConfig
  const isObjectConfig = typeof (config as any).configServiceId === 'string' &&
    Array.isArray(objectConfig.targetPathQuery) &&
    objectConfig.targetPathQuery.length
  if(!isObjectConfig) throw new Error(`Invalid object config ${JSON.stringify(config, null, 2)}`)
}
