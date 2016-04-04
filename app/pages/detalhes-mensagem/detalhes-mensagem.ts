import {Page, NavController, NavParams} from 'ionic-angular';
import {MessageService} from '../../providers/message-service/message-service';
import {Message} from '../../models/message/message';
import {TimeToString} from '../../pipes/time-to-string'

/*
  Generated class for the DetalhesMensagemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/detalhes-mensagem/detalhes-mensagem.html',
  pipes: [TimeToString]
})
export class DetalhesMensagemPage {

  msg: Message;
  novoComentario: string;

  constructor( public nav: NavController, public params: NavParams, public messageService: MessageService) {
    this.msg = params.get('message');
  }

  sendComment(){
    this.messageService.addComment(this.msg, this.novoComentario);
    this.novoComentario = '';
  }

  approveMessage(){
    this.messageService.approveMessage(this.msg);
  }

  reproveMessage(){
    this.messageService.reproveMessage(this.msg);
  }


}
