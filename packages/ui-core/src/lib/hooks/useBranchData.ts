import { branchDataStore, PathSegment } from '@gdmf/ui-core';
import { useRecoilValue } from 'recoil';

export const useBranchData = <T>(path: Array<PathSegment>) => {
  const state = branchDataStore.get<T>(path)
  return useRecoilValue(state)
}
