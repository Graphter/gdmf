import { NodeConfig } from '../NodeConfig';

const configMap = new Map<string, NodeConfig>()
const has = (configId: string) => configMap.has(configId)
const get = (configId: string) => configMap.get(configId)
const getAll = () =>
  Array.from(configMap.entries())
    .map<NodeConfig>(([k, v]) => v)
const set = (config: NodeConfig) => configMap.set(config.id, config)
const setAll = (configs: Array<NodeConfig>) => configs.forEach(config => set(config))
export const configStore = {
  has,
  get,
  getAll,
  set,
  setAll
}
