import { NodeConfig, PathQuerySegment, PathSegment } from '@gdmf/ui-core';

export interface BreadCrumbConfigMapping {
  rootConfig: NodeConfig,
  mappings: Array<BreadCrumbMapping>
}

export interface BreadCrumbMapping {
  /**
   * The path query relative to the root config
   */
  relativePathQuery: Array<PathQuerySegment>,
  displayValue?: string,
  displayPath?: Array<PathSegment>
}
