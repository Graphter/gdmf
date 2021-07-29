import { PathSegment } from '@gdmf/ui-core';

export interface Service<T, D> {
  list?: (skip?: number, take?: number) => Promise<ListResult<T>>,
  get?: (id: D) => Promise<GetResult<T>>,
  save?: (id: D, data: unknown) => Promise<SaveResult<T>>
}

export interface ListResult<T> {
  items: Array<T>,
  count: number,
  skip: number,
  take: number
}

export interface GetResult<T> {
  item: T | null,
  version?: number,
  created?: Date,
  updated?: Date,
  deleted?: boolean
}

export interface SaveResult<T> {
  item: T
  version: number
  created?: Date
  updated: Date
}
