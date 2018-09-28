import { Injectable } from '@angular/core';
import { IPlabAction } from '../interfaces';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class GlobalActions {
  public static readonly TYPE = 'GLOBAL_ACTION';
  public static readonly LOADING_STARTED = 'LOADING_STARTED';
  public static readonly LOADING_ENDED = 'LOADING_ENDED';
  public static readonly STORE_VIEWPORT = 'STORE_VIEWPORT';

  public loadingStarted = (): IPlabAction => ({
    type: GlobalActions.LOADING_STARTED,
    meta: { type: GlobalActions.TYPE }
  });

  public loadingEnded = (): IPlabAction => ({
    type: GlobalActions.LOADING_ENDED,
    meta: { type: GlobalActions.TYPE }
  });

  public storeViewport = (device): IPlabAction => ({
    type: GlobalActions.STORE_VIEWPORT,
    payload: { viewport: device },
    meta: { type: GlobalActions.TYPE }
  });
}
