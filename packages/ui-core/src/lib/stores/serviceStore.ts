import { Service } from '../Service';

const serviceMap = new Map<string, Service<unknown>>()

const get = <T>(serviceId: string) => {
  const service = serviceMap.get(serviceId)
  if(!service) throw new Error(`Couldn't find the '${serviceId}' service. Have you registered it?`)
  return service as Service<T>
}

const register = (serviceId: string, service: Service<unknown>) => {
  serviceMap.set(serviceId, service)
}

export const serviceStore = {
  get,
  register
}
