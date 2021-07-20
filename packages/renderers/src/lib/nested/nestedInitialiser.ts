
import { isNestedNodeConfig } from './isNestedNodeConfig';
import { configStore, Initialiser } from '@gdmf/ui-core';
export const nestedInitialiser: Initialiser = (
  {
    path,
    config,
    parentLayer
  }) => {
  isNestedNodeConfig(config)
  const nestedConfig = configStore.get(config.nestedConfigId)
  if(!nestedConfig) throw new Error(`Couldn't find '${config.nestedConfigId}' config. Make sure it's added to the config store.`)
  return {
    layer: parentLayer,
    children: [
      {
        path,
        config: nestedConfig
      }
    ]
  }
}
