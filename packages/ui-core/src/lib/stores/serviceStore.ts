import { Service } from '../Service';

const serviceMap = new Map<string, Service<unknown, any>>()

const get = <T = unknown, D = unknown>(serviceId: string) => {
  const service = serviceMap.get(serviceId)
  if(!service) throw new Error(`Couldn't find the '${serviceId}' service. Have you registered it?`)
  return service as Service<T, D>
}

const register = <T, D>(serviceId: string, service: Service<T, D>) => {
  serviceMap.set(serviceId, service)
}

export const serviceStore = {
  get,
  register
}
