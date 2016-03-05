import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the CriarMensagemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/criar-mensagem/criar-mensagem.html',
})
export class CriarMensagemPage {
  constructor( public nav: NavController) {

  }

  salvarMensagem(){
    /* TODO */
    this.nav.pop()
  }

}
