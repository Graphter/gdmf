import { NodeConfig } from '../NodeConfig';

const configMap = new Map<string, NodeConfig>()
const get = (configId: string) => configMap.get(configId)
const set = (config: NodeConfig) => configMap.set(config.id, config)
const setAll = (configs: Array<NodeConfig>) => configs.forEach(config => set(config))
export const configStore = {
  get,
  set,
  setAll
}