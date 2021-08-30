import { pageModel } from './models/pageModel';
import { PathQuery } from '@gdmf/ui-core';
import { configModel } from './models/configModel';
import { BreadCrumbConfigMapping } from './components/BreadCrumb/BreadCrumbMapping';

export const breadcrumbMappings: Array<BreadCrumbConfigMapping> = [
  {
    rootConfig: pageModel,
    mappings: [
      { relativePathQuery: [ ], displayValue: 'Pages' },
      { relativePathQuery: [ PathQuery.Any ], displayPath: [ 'title' ] },
      { relativePathQuery: [ PathQuery.Any, 'authors' ], displayValue: 'Authors' },
      { relativePathQuery: [ PathQuery.Any, 'authors', PathQuery.Any ], displayPath: [ 'name' ] },
    ]
  },
  {
    rootConfig: configModel,
    mappings: [
      { relativePathQuery: [ ], displayValue: 'Configs' },
      { relativePathQuery: [ PathQuery.Any ], displayPath: [ 'id' ] },
    ]
  }
]
