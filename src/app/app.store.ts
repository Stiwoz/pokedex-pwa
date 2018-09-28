import { GlobalActions } from '../shared/actions';
import { Reducer } from 'redux';
import { createGlobalReducer } from '../shared/reducers';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { IAppState } from './app.state';
import { IPlabAction } from '../shared/interfaces';

export const getRootReducer = (
  sessionStorage: SessionStorageService,
  localStorage: LocalStorageService
): Reducer<IAppState, IPlabAction> =>
  combineReducers(
    createGlobalReducer(GlobalActions.TYPE, sessionStorage, localStorage)
  );

export const combineReducers = (...reducers) => (prevState, value, ...args) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
  );
