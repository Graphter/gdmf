import { Route, Link } from 'react-router-dom';
import {
  configStore, pathConfigsStore,
  rendererRegStore, serviceStore
} from '@gdmf/ui-core';
import React, { Fragment }  from 'react';
import {
  conditionalRegistration,
  listRegistration,
  nestedRegistration,
  objectRegistration,
  transparentObjectRegistration,
  textRegistration
} from '@gdmf/renderers';
import { Edit } from './pages/Edit';
import { dynamicNestedRegistration } from './renderers/dynamic-nested';
import { pageModel } from './models/pageModel';
import { configModel } from './models/configModel';
import { Model } from './pages/Model';
import { pageService } from './services/pageService';
import { configService } from './services/configService';
import { simpleTextModel } from './models/simpleTextModel';
import { rendererConfigService } from './services/rendererConfigService';

function App() {
  rendererRegStore.register(objectRegistration)
  rendererRegStore.register(transparentObjectRegistration)
  rendererRegStore.register(listRegistration)
  rendererRegStore.register(conditionalRegistration)
  rendererRegStore.register(textRegistration)
  rendererRegStore.register(nestedRegistration)
  rendererRegStore.register(dynamicNestedRegistration)

  serviceStore.register('page', pageService)
  serviceStore.register('renderer-config', rendererConfigService)
  serviceStore.register('config', configService)

  configStore.setAll([
    pageModel,
    configModel,
    simpleTextModel
  ])

  pathConfigsStore.set([ pageModel ], ['page'])
  pathConfigsStore.set([ configModel ], ['config'])

  const navModels = [
    pageModel,
    configModel,
  ]

  return (
    <>
      <div className="App container p-10 mt-10 rounded-2xl bg-white">
        <header className='flex items-center'>
          <h1 className='text-4xl mr-4'><Link to={`/${navModels[0].id}`}>GDMF</Link></h1>
          {navModels.map((model, i) => (
              <Fragment key={model.id}>
              <Link to={`/${model.id}`}>
                {model.id}
              </Link>
                {(i !== navModels.length - 1) && (
                  <span className='mx-2 text-gray-200'>|</span>
                )}
              </Fragment>
          ))}
        </header>
      </div>
      <Route path='/:configId'>
        <Model/>
      </Route>
    </>
  )
}

export default App;
