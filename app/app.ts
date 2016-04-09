import {App, Platform} from 'ionic-angular';
import {PrincipalPage} from './pages/principal/principal';
import {LoginPage} from './pages/login/login';
import {provide} from 'angular2/core';

import {UserService} from "./providers/user-service/user-service";
import {MessageService} from './providers/message-service/message-service';
import {FirebaseService} from './providers/firebase-service/firebase-service';
import {GeofireService} from './providers/geofire-service/geofire-service';

@App({
  providers: [FirebaseService, GeofireService, UserService, MessageService],
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, userService: UserService) {

    if( userService.isLoggedIn() || !platform.is('cordova') ){
      this.rootPage = PrincipalPage;
    }

    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)



    });
  }
}
