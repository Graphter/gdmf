import {
  configStore,
  ListResult,
  PathQuery,
  PathSegment,
  pathUtils,
  serviceStore,
  useBranchInitialiser
} from '@gdmf/ui-core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ListItem } from './ListItem';
import { BreadCrumbs } from '../BreadCrumb/BreadCrumbs';

export interface ListProps {
  configId: string,
  idPath: Array<PathSegment>
  displayPath: Array<PathSegment>
}

export const List = ({ configId, idPath, displayPath }: ListProps) => {
  const params = useParams<{ configId: string }>();

  const path = [ params.configId ]

  const config = configStore.get(configId)
  if(!config) throw new Error(`Couldn't find '${configId}' config. Have you registered it with the config store?`)
  const service = serviceStore.get(configId);
  const [ listResult, setListResult ] = useState<ListResult<unknown> | null>(null);

  const [ initialising, setInitialising ] = useState(true);
  const branchInitialiser = useBranchInitialiser();

  useEffect(() => {
    (async () => {
      if (!service.list) throw new Error(`Service '${configId}' lacks list() capability required to display the list page`);
      setInitialising(true);
      const itemResult = await service.list()
      await Promise.all(itemResult.items.map((item: unknown) => {
        const instanceId = pathUtils.getValueByLocalPath(item, idPath)
        return branchInitialiser([ config.id, instanceId ], config, '', item)
      }))
      setListResult(itemResult);

      setInitialising(false);
    })();
  }, [ configId ]);

  return (
    <>

      <BreadCrumbs path={path} mappings={[
        { pathQuery: [ 'page' ], displayValue: 'Pages' },
      ]} />

      {
        !initialising && listResult ? (
          listResult.items?.map(item => {
            const id = pathUtils.getValueByLocalPath(item, idPath)
            const displayValue = pathUtils.getValueByLocalPath(item, displayPath)
            return (
              <div key={id}>
                <Link to={`/${config.id}/${id}`}>{displayValue}</Link>
              </div>
            )
          })) : (
            <div>Loading...</div>
          )
      }
    </>
  );
};

