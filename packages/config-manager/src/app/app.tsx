import { Route, Link } from 'react-router-dom';
import {
  rendererRegStore
} from '@gdmf/ui-core';
import React  from 'react';
import {
  conditionalRegistration,
  listRegistration,
  nestedRegistration,
  objectRegistration,
  transparentObjectRegistration,
  textRegistration
} from '@gdmf/renderers';
import { Edit } from './pages/Edit';

function App() {
  rendererRegStore.register(objectRegistration)
  rendererRegStore.register(transparentObjectRegistration)
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
