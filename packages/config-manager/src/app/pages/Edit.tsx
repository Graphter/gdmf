import { configStore, PathRenderer, pathUtils, useBranchDataCallback, useBranchInitialiser } from '@gdmf/ui-core';
import React, { useEffect, useState } from 'react';
import { pageModel } from '../models/pageModel';
import { simpleTextModel } from '../models/simpleTextModel';
import { pageData } from '../models/pageData';
import { useParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumb/BreadCrumbs';
import { PathQuery } from '@gdmf/ui-core'

export const Edit = () => {
  const params = useParams<{ model: string, path: string }>();
  const path = [ params.model, ...pathUtils.fromUrl(params.path) ]
  const rootPath = path.slice(0, 2)

  const save = useBranchDataCallback(rootPath, async (branchData) => {
    console.log({ branchData })
  })

  const [ initialising, setInitialising ] = useState(true)

  configStore.set(pageModel)
  configStore.set(simpleTextModel)

  const branchInitialiser = useBranchInitialiser()
  useEffect(() => {
    (async () => {
      setInitialising(true)
      await branchInitialiser(rootPath, pageModel, '', pageData)

      setInitialising(false)
    })()
  }, [])

  if(initialising){
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="App container p-10 mt-10 rounded-2xl bg-white">
      <BreadCrumbs path={path} mappings={[
        { pathQuery: [ 'page' ], displayValue: 'Pages' },
        { pathQuery: [ 'page', PathQuery.Any ], displayPath: [ 'title' ] },
        { pathQuery: [ 'page', PathQuery.Any, 'authors' ], displayValue: 'Authors' },
        { pathQuery: [ 'page', PathQuery.Any, 'authors', PathQuery.Any ], displayPath: [ 'name' ] },
      ]} />
      <form onSubmit={(e) => {
        (async () => {
          await save()
        })()
        e.preventDefault()
      }}>
        <PathRenderer path={path} />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
