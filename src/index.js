import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';
import GlobalStyle from "./globalStyle";
import Provider from './myContext/Provider';
import ToastMessageProvider from './components/base/toast_message/ToastMessageProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <BrowserRouter>
        <Provider>
          <ToastMessageProvider>
            <App />
          </ToastMessageProvider>
        </Provider>
      </BrowserRouter>
    </GlobalStyle>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
