import {Page, NavController} from 'ionic-angular';
import {DetalhesMensagemPage} from '../detalhes-mensagem/detalhes-mensagem';
import {MessageService} from '../../providers/message-service/message-service';
import {Message} from '../../models/message/message';

/*
  Generated class for the MinhasMensagensPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/minhas-mensagens/minhas-mensagens.html',
  providers: []
})
export class MinhasMensagensPage {

  messages: Array<Message>;

  constructor( public nav: NavController, public msgService: MessageService) {
    this.carregarMensagens();
  }

  carregarMensagens() {
    this.messages = this.msgService.getMinhasMensagens();
  }

  openDetalhesMensagemPage(currentMessage){
    this.nav.push(DetalhesMensagemPage, {message: currentMessage});
  }

}
