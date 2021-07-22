import { Route, Link, useParams } from 'react-router-dom';
import {
  pathUtils,
  rendererRegStore
} from '@gdmf/ui-core';
import React  from 'react';
import {
  conditionalRegistration,
  listRegistration,
  nestedRegistration,
  objectRegistration,
  textRegistration
} from '@gdmf/renderers';
import { Edit } from './pages/Edit';
import { BreadCrumbs } from './components/BreadCrumb/BreadCrumbs';

function App() {
  rendererRegStore.register(objectRegistration)
  rendererRegStore.register(listRegistration)
  rendererRegStore.register(conditionalRegistration)
  rendererRegStore.register(textRegistration)
  rendererRegStore.register(nestedRegistration)

  return (
    <>
      <Route
        path="/:model"
        exact
      >
        <div>
          <h1>List</h1>
          <Link to="/page/one">Page One</Link>
        </div>
      </Route>
      <Route path='/:model/:path+'>
        <Edit/>
      </Route>
    </>
  )
}

export default App;
