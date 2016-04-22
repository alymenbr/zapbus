import {Page, NavController} from 'ionic-angular';
import {DetalhesMensagemPage} from '../detalhes-mensagem/detalhes-mensagem';
import {MessageService} from '../../providers/message-service/message-service';
import {UserService} from '../../providers/user-service/user-service';
import {Message} from '../../models/message/message';
import {TimeToString} from '../../pipes/time-to-string';

/*
  Generated class for the MinhasMensagensPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/minhas-mensagens/minhas-mensagens.html',
  pipes: [TimeToString]
})
export class MinhasMensagensPage {

  messages: Array<Message>;

  constructor( public nav: NavController, public msgService: MessageService, public userService: UserService) {
    this.messages = new Array<Message>();
  }

  onPageWillEnter() {
    this.carregarMensagens();
  }

  carregarMensagens() {
    this.msgService.syncMinhasMensagens(this.messages);
  }

  openDetalhesMensagemPage(currentMessage){
    this.nav.push(DetalhesMensagemPage, {message: currentMessage});
  }

}
