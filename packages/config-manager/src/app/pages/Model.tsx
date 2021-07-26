import { Link, Route, useParams } from 'react-router-dom';
import { Edit } from './Edit';
import React, { useEffect, useState } from 'react';
import { ListResult, PathQuery, PathSegment, pathUtils, serviceStore } from '@gdmf/ui-core';
import { List } from '../components/List/List';
import { BreadCrumbs } from '../components/BreadCrumb/BreadCrumbs';

const idMappings = new Map<string, Array<PathSegment>>([
  ['page', [ 'id' ] ],
  ['config', [ 'id' ]]
])
const displayMappings = new Map<string, Array<PathSegment>>([
  ['page', [ 'title' ]],
  ['config', [ 'id' ]]
])

export const Model = () => {
  const params = useParams<{ configId: string }>();

  const idPath = idMappings.get(params.configId)
  const displayPath = displayMappings.get(params.configId)

  if(!idPath || !displayPath) throw new Error(`Couldn't find ID or name path mapping for '${params.configId}' config`)

  return (
    <>
      <div className="App container p-10 mt-10 rounded-2xl bg-white">
        <Route
          path="/:configId"
          exact
        >
          <List configId={params.configId} idPath={idPath} displayPath={displayPath} />
        </Route>
        <Route path='/:configId/:path+'>
          <Edit/>
        </Route>
      </div>
    </>
  )
}
