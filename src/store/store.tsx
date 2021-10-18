/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../components/reducers';
import { getDefaultMiddleware } from '@reduxjs/toolkit';





export const rootStore = createStore(rootReducer);

export default function ({ children, initialState = {} }: any) {
  const store = <Provider store={rootStore}>{children}</Provider>;

  return store;
}
