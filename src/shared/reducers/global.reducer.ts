import { IPlabAction } from '../interfaces';
import { IAppState, getInitialState } from '../../app/app.state';
import { GlobalActions } from '../actions';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

export function createGlobalReducer(
  actionType: IPlabAction['type'],
  sessionStorage: SessionStorageService,
  localStorage: LocalStorageService
) {
  return function globalReducer(
    lastState: IAppState = getInitialState(sessionStorage, localStorage),
    action: IPlabAction
  ): IAppState {
    if (!action.meta || action.meta.type !== actionType) {
      return lastState;
    }
    let loadingBar: HTMLElement | null = document.getElementById('load-bar');

    switch (action.type) {
      case GlobalActions.STORE_VIEWPORT:
        return {
          ...lastState,
          viewport: action.payload.viewport
        };

      case GlobalActions.LOADING_STARTED:
        if (loadingBar) {
          loadingBar.style.display = 'block';
        }
        return {
          ...lastState,
          httpInProgress: true
        };

      case GlobalActions.LOADING_ENDED:
        if (loadingBar) {
          loadingBar.style.display = 'none';
        }
        return {
          ...lastState,
          httpInProgress: false
        };

      default:
        return lastState;
    }
  };
}
