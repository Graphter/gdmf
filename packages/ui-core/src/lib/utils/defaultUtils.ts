import { NodeConfig } from '../NodeConfig';
import { rendererRegStore } from '../stores/rendererRegStore';

export const valueOrDefaultOrNull = async <T>(config: NodeConfig, value?: T, ): Promise<T | null> => {
  if(typeof value !== 'undefined') return value
  return createDefault(config)
}

export const createDefault = async <T>(config: NodeConfig): Promise<T> => {
  let value = undefined
  if(config.createDefault) value = config.createDefault()
  if(typeof value !== 'undefined') return value
  const rendererReg = rendererRegStore.get(config.type)
  if(rendererReg.createDefault) value = await rendererReg.createDefault(config)
  return value
}

export const ensureValue = async <T>(value: T | undefined, creator: () => Promise<T>): Promise<T> => {
  if(typeof value !== 'undefined') return value
  return await creator()
}

export const defaultUtils = {
  valueOrDefaultOrNull,
  createDefault
}