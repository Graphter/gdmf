import { PathQuerySegment, PathSegment } from '@gdmf/ui-core';

export interface BreadCrumbMapping {
  pathQuery: Array<PathQuerySegment>,
  displayValue?: string,
  displayPath?: Array<PathSegment>
}
