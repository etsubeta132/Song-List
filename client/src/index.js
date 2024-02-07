import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from "@reduxjs/toolkit";


import songReducer from "./songState";
import songSaga from './Saga/songSaga';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs:songReducer
  },
  middleware: (getDefaultMiddleware) => [sagaMiddleware, ...getDefaultMiddleware()],
});
sagaMiddleware.run(songSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>

    <App />

  </Provider>
);

