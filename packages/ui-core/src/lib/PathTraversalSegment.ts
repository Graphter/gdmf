import { PathSegment } from './PathSegment';

export type PathTraversalSegment = PathSegment | {
  $up: number
}
