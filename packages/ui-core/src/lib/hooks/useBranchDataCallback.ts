import { useRecoilCallback } from 'recoil';
import { PathSegment } from '../PathSegment';
import { branchDataStore } from '../stores/branchDataStore';

export const useBranchDataCallback = <Args extends ReadonlyArray<unknown>>(
  path: Array<PathSegment>,
  fn: (branchData: any, ...args: Args) => Promise<void>
) => {
  const cb = useRecoilCallback(({ snapshot }) => async (...args: any) => {
    const branchData = await snapshot.getPromise(branchDataStore.get(path))
    await fn(branchData, ...args)
  })
  return cb
}
