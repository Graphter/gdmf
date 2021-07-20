import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { RecoilRoot } from 'recoil';

import "tailwindcss/tailwind.css"

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <App/>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
