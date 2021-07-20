export interface NodeConfig {
  id: string,
  type: string,
  createDefault?: () => any
}