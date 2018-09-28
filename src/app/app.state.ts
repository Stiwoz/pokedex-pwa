import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

/**
 * Stato dell'applicazione
 */
export interface IAppState {
  httpInProgress: boolean;
  viewport: 'desktop' | 'mobile';
}

const _INITIAL_STATE: IAppState = {
  httpInProgress: false,
  viewport: 'mobile',
};

/**
 * Estendo lo stato iniziale dell'applicazione con i valori del sessionStorage e del localStorage
 * @param {SessionStorageService} sessionStorage
 * @param {LocalStorageService} localStorage
 */
export const getInitialState = (
  sessionStorage: SessionStorageService,
  localStorage: LocalStorageService
): IAppState => {

  return {
    ..._INITIAL_STATE,
  };
};
