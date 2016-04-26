import {Page, NavController, Platform, MenuController, IonicApp} from 'ionic-angular';
import {MensagensProximasPage} from '../mensagens-proximas/mensagens-proximas';
import {MinhasMensagensPage} from '../minhas-mensagens/minhas-mensagens';

/*
  Generated class for the PrincipalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/principal/principal.html',
})
export class PrincipalPage {

  constructor( public app: IonicApp, public nav: NavController, platform: Platform, public menu: MenuController) {
    
  }

  openMensagensProximasPage(){
    this.nav.push(MensagensProximasPage, {});
  }

  openMinhasMensagensPage(){
    this.nav.push(MinhasMensagensPage, {});
  }
}
