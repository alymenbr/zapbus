import {ionicBootstrap, Platform, MenuController, App, Nav, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {PrincipalPage} from './pages/principal/principal';
import {LoginPage} from './pages/login/login';
import {provide, NgZone} from '@angular/core';
import {ViewChild} from '@angular/core';
import {MensagensProximasPage} from './pages/mensagens-proximas/mensagens-proximas';
import {MinhasMensagensPage} from './pages/minhas-mensagens/minhas-mensagens';
import {CriarMensagemPage} from './pages/criar-mensagem/criar-mensagem';
import {ProfilePage} from './pages/profile/profile'

import {UserService} from './providers/user-service/user-service';
import {MessageService} from './providers/message-service/message-service';
import {FirebaseService} from './providers/firebase-service/firebase-service';

import {Http} from '@angular/http'
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './providers/auth-service/auth-service';


@Component({
  templateUrl: 'build/app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user: any = null;
  rootPage: any = LoginPage;
  pages: any = [  { icon: 'bus', title: 'Mensagens Próximas', component: MensagensProximasPage },
                  { icon: 'home', title: 'Minhas Mensagens', component: MinhasMensagensPage },
                  { icon: 'add', title: 'Criar Mensagem', component: CriarMensagemPage } ];

  constructor(public zone: NgZone, public events: Events, public platform: Platform, public userService: UserService, public messageService: MessageService, public app: App, public menu: MenuController) {

/*
    if( userService.isLoggedIn() || !platform.is('cordova') ){
      this.updateUser();
      this.rootPage = PrincipalPage;
    }
*/
    this.listenToLoginEvents();

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

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateUser();
    });
  }

  updateUser(){
    this.user = this.userService.getCurrentUser()
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();

    // navigate to the new page if it is not the current page
    this.nav.push(page.component);
  }

  logout(){
    this.menu.close();
    this.userService.logout();
    this.nav.setRoot(LoginPage);
  }
}

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/
let prodMode: boolean = window.hasOwnProperty('cordova');

ionicBootstrap(MyApp, [ FirebaseService,
                        UserService,
                        MessageService,
                        App,
                        MenuController,
                        provide(AuthHttp, {
                              useFactory: (http) => {
                                return new AuthHttp(new AuthConfig(), http);
                              },
                              deps: [Http]
                            }),
                        AuthService],
                        {prodMode: prodMode}
                      );
