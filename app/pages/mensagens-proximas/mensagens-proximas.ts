import {Page, NavController} from 'ionic-angular';
import {DetalhesMensagemPage} from '../detalhes-mensagem/detalhes-mensagem';
import {MessageService} from '../../providers/message-service/message-service';
import {CriarMensagemPage} from '../criar-mensagem/criar-mensagem';
import {Message} from '../../models/message/message';
import {TimeToString} from '../../pipes/time-to-string';

/*
  Generated class for the MensagensProximasPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/mensagens-proximas/mensagens-proximas.html',
  pipes: [TimeToString]
})
export class MensagensProximasPage {

  messages: Array<Message>;

  constructor( public nav: NavController, public msgService: MessageService) {

  }

  onPageWillEnter() {
    this.carregarMensagens();
  }

  carregarMensagens() {
    this.messages = new Array<Message>();
    this.msgService.syncMensagensProximas(this.messages);
  }

  openCriarMensagemPage(){
    this.nav.push(CriarMensagemPage, {messageList: this.messages});
  }

  openDetalhesMensagemPage(currentMessage){
    this.nav.push(DetalhesMensagemPage, {message: currentMessage});
  }

}
