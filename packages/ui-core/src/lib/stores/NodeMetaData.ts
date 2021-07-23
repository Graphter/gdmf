import { NodeConfig } from '@gdmf/ui-core';

/**
 * This interface represents a nodes external data along with the config for the node.
 * Tracking this information together facilitates the merging process
 */
export interface NodeMetaData {
  config: NodeConfig,
  data: unknown
}
