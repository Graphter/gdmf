import { NodeRendererRegistration } from '../NodeRendererRegistration';

const rendererRegistrationMap = new Map<string, NodeRendererRegistration>()

export const rendererRegStore = {
  get: (configType: string) => {
    const registration = rendererRegistrationMap.get(configType)
    if(!registration) throw new Error(`No '${configType}' registration found`)
    return registration
  },
  register: (registration: NodeRendererRegistration, typeOverride?: string) => {
    rendererRegistrationMap.set(typeOverride || registration.type, registration)
  }
}