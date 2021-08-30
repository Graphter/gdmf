import {
  configStore,
  PathRenderer,
  pathUtils,
  serviceStore,
  useBranchDataCallback,
  useBranchInitialiser
} from '@gdmf/ui-core';
import { pageModel } from '../models/pageModel';
import { configModel } from '../models/configModel';
import { Model } from '../pages/Model';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumb/BreadCrumbs';
import { PathQuery } from '@gdmf/ui-core';
import { breadcrumbMappings } from '../breadcrumbMappings';

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

  // [
  //   { rootConfigId: 'page', relativePathQuery: [ 'page' ], displayValue: 'Pages' },
  //   { relativePathQuery: [ 'page', PathQuery.Any ], displayPath: [ 'title' ] },
  //   { relativePathQuery: [ 'page', PathQuery.Any, 'blogAuthors' ], displayValue: 'Authors' },
  //   { relativePathQuery: [ 'page', PathQuery.Any, 'blogAuthors', PathQuery.Any ], displayPath: [ 'name' ] }
  // ]

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
          <BreadCrumbs path={path} mappings={breadcrumbMappings} />
          <PathRenderer path={path} />
          <button type='submit'>Save</button>
        </form>
      )}
    </>
  );
};
