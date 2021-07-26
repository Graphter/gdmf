import {
  configStore,
  NodeConfig,
  PathSegment,
  Service
}
  from '@gdmf/ui-core';
import { pageData } from '../models/pageData';

export const pageService: Service<unknown> = {
  get: () => {
    return Promise.resolve({
      item: pageData
    });
  },
  list: () => {
    return Promise.resolve({
      items: [
        pageData
      ],
      count: 1,
      skip: 0,
      take: 10
    })
  }
};
