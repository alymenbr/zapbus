import {Page, NavController} from 'ionic-angular';
import {DetalhesMensagemPage} from '../detalhes-mensagem/detalhes-mensagem';
import {CriarMensagemPage} from '../criar-mensagem/criar-mensagem';

/*
  Generated class for the MensagensProximasPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/mensagens-proximas/mensagens-proximas.html',
})
export class MensagensProximasPage {

  messages = ['Mensagem1', 'Mensagem2'];

  constructor( public nav: NavController) {

  }

  openCriarMensagemPage(){
    this.nav.push(CriarMensagemPage, {});
  }

  openDetalhesMensagemPage(){
    this.nav.push(DetalhesMensagemPage, {});
  }

}
