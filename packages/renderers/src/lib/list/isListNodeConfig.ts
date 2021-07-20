import { ListNodeConfig } from './ListNodeConfig';
import { NodeConfig } from '@gdmf/ui-core';

export function isListNodeConfig(config: NodeConfig): asserts config is ListNodeConfig {
  const listConfig = config as ListNodeConfig
  const isListNodeConfig = 'itemConfig' in listConfig &&
    typeof listConfig.itemConfig === 'object'
  if(!isListNodeConfig) throw new Error(`Invalid list config ${JSON.stringify(config, null, 2)}`)
}
