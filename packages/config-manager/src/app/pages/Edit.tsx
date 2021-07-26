import {
  configStore,
  PathRenderer,
  pathUtils,
  serviceStore,
  useBranchDataCallback,
  useBranchInitialiser
} from '@gdmf/ui-core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumb/BreadCrumbs';
import { PathQuery } from '@gdmf/ui-core';

export const Edit = () => {
  const params = useParams<{ configId: string, path: string }>();
  const path = [ params.configId, ...pathUtils.fromUrl(params.path) ];
  const rootPath = path.slice(0, 2);

  const save = useBranchDataCallback(rootPath, async (branchData) => {
    console.log({ branchData });
  });

  const [ initialising, setInitialising ] = useState(true);

  const branchInitialiser = useBranchInitialiser();
  useEffect(() => {
    (async () => {
      setInitialising(true)
      const service = serviceStore.get(params.configId)
      if(!service.get) throw new Error(`Service '${params.configId}' lacks the get() capability required to edit`)
      const config = configStore.get(params.configId)
      if(!config) throw new Error(`Couldn't find '${params.configId}' config`)
      const getResult = await service.get(path[1])
      await branchInitialiser(rootPath, config, '', getResult.item)
      setInitialising(false)
    })();
  }, [params.configId]);

  return (
    <>
      {initialising ? (
        <div>

        </div>
      ) : (
        <form onSubmit={(e) => {
          (async () => {
            await save();
          })();
          e.preventDefault();
        }}>
          <BreadCrumbs path={path} mappings={[
            { pathQuery: [ 'page' ], displayValue: 'Pages' },
            { pathQuery: [ 'page', PathQuery.Any ], displayPath: [ 'title' ] },
            { pathQuery: [ 'page', PathQuery.Any, 'blogAuthors' ], displayValue: 'Authors' },
            { pathQuery: [ 'page', PathQuery.Any, 'blogAuthors', PathQuery.Any ], displayPath: [ 'name' ] }
          ]} />
          <PathRenderer path={path} />
          <button type='submit'>Save</button>
        </form>
      )}
    </>
  );
};
