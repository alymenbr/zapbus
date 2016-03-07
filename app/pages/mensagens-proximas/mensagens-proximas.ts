import {Page, NavController} from 'ionic-angular';
import {DetalhesMensagemPage} from '../detalhes-mensagem/detalhes-mensagem';
import {MessageService} from '../../providers/message-service/message-service';
import {CriarMensagemPage} from '../criar-mensagem/criar-mensagem';

/*
  Generated class for the MensagensProximasPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/mensagens-proximas/mensagens-proximas.html',
  providers: [MessageService]
})
export class MensagensProximasPage {

  messages;

  constructor( public nav: NavController, public msgService: MessageService) {
    this.carregarMensagens();
  }

  carregarMensagens() {
    this.messages = this.msgService.getMensagensProximas();
  }

  openCriarMensagemPage(){
    this.nav.push(CriarMensagemPage, {});
  }

  openDetalhesMensagemPage(currentMessage){
    this.nav.push(DetalhesMensagemPage, {message: currentMessage});
  }

}
