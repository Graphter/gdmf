import { NodeConfig, PathSegment } from '@gdmf/ui-core';

export interface ListNodeConfig extends NodeConfig {
  itemConfig: NodeConfig,
  titlePath: Array<PathSegment>,
  descriptionPath?: Array<PathSegment>,
  supplementaryInformationPaths?: Array<{
    name: string,
    path: Array<PathSegment>
  }>
}
