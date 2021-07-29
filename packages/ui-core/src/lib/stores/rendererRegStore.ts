import { NodeRendererRegistration } from '../NodeRendererRegistration';

const rendererRegistrationMap = new Map<string, NodeRendererRegistration>();

const has = (configType: string) => rendererRegistrationMap.has(configType)
const get = (configType: string) => {
  const registration = rendererRegistrationMap.get(configType);
  if (!registration) throw new Error(`No '${configType}' registration found`);
  return registration;
};
const register = (registration: NodeRendererRegistration, typeOverride?: string) => {
  rendererRegistrationMap.set(typeOverride || registration.type, registration);
};


export const rendererRegStore = {
  has,
  get,
  register
}
