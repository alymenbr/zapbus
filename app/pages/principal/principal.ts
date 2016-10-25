import {NavController, Platform, MenuController} from 'ionic-angular';
import {Component} from '@angular/core';
import {MensagensProximasPage} from '../mensagens-proximas/mensagens-proximas';
import {MinhasMensagensPage} from '../minhas-mensagens/minhas-mensagens';

/*
  Generated class for the PrincipalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/principal/principal.html',
})
export class PrincipalPage {

  constructor(public nav: NavController, platform: Platform, public menu: MenuController) {

  }

  openMensagensProximasPage(){
    this.nav.push(MensagensProximasPage, {});
  }

  openMinhasMensagensPage(){
    this.nav.push(MinhasMensagensPage, {});
  }
}
