import {App, Platform, MenuController, IonicApp} from 'ionic-angular';
import {PrincipalPage} from './pages/principal/principal';
import {LoginPage} from './pages/login/login';
import {provide} from '@angular/core';
import {MensagensProximasPage} from './pages/mensagens-proximas/mensagens-proximas';
import {MinhasMensagensPage} from './pages/minhas-mensagens/minhas-mensagens';
import {CriarMensagemPage} from './pages/criar-mensagem/criar-mensagem';

import {UserService} from './providers/user-service/user-service';
import {MessageService} from './providers/message-service/message-service';
import {FirebaseService} from './providers/firebase-service/firebase-service';

@App({
  providers: [FirebaseService, UserService, MessageService, IonicApp, MenuController],
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  templateUrl: 'build/app.html'
})

export class MyApp {
  user: any;
  rootPage: any = LoginPage;
  pages: any = [  { icon: 'bus', title: 'Mensagens Próximas', component: MensagensProximasPage },
                  { icon: 'home', title: 'Minhas Mensagens', component: MinhasMensagensPage },
                  { icon: 'add', title: 'Criar Mensagem', component: CriarMensagemPage } ];

  constructor(public platform: Platform, public userService: UserService, public messageService: MessageService, public app: IonicApp, public menu: MenuController) {

    if( userService.isLoggedIn() || !platform.is('cordova') ){
      this.user = userService.getCurrentUser();
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

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();

    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.push(page.component);
  }

  logout(){
    this.userService.logout();
    let nav = this.app.getComponent('nav');
    nav.setRoot(LoginPage);
  }
}
