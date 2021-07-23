import { ObjectNodeConfig } from './ObjectNodeConfig';
import { NodeConfig } from '@gdmf/ui-core';

export function isObjectNodeConfig(config: NodeConfig): asserts config is ObjectNodeConfig {
  const objectConfig = config as ObjectNodeConfig
  const isObjectConfig = 'properties' in config &&
    Array.isArray(objectConfig.properties) &&
    objectConfig.properties.length > 0 &&
    !objectConfig.properties.some(prop => !prop.config)
  if(!isObjectConfig) throw new Error(`Invalid object config ${JSON.stringify(config, null, 2)}`)
}
