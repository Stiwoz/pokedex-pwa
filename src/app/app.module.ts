import {
  DevToolsExtension,
  NgRedux,
  NgReduxModule
} from '@angular-redux/store';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {
  LocalStorageService,
  Ng2Webstorage,
  SessionStorageService
} from 'ngx-webstorage';
import { HomePage } from '../pages/home/home';
import { IAppEnv } from '../shared/interfaces';
import { GlobalService } from '../shared/services';
import { MyApp } from './app.component';
import { getInitialState, IAppState } from './app.state';
import { getRootReducer } from './app.store';

declare const ENV: IAppEnv;
@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgReduxModule,
    Ng2Webstorage
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    sessionStorage: SessionStorageService,
    localStorage: LocalStorageService
  ) {
    const storeEnhancers =
      devTools.isEnabled() && ENV.ENV == 'dev' ? [devTools.enhancer()] : [];

    ngRedux.configureStore(
      getRootReducer(sessionStorage, localStorage),
      getInitialState(sessionStorage, localStorage),
      [],
      storeEnhancers
    );
  }
}
