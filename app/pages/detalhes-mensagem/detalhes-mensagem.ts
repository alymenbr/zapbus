import {Page, NavController, NavParams} from 'ionic-angular';
import {MessageService} from '../../providers/message-service/message-service';
import {Message} from '../../models/message/message';

/*
  Generated class for the DetalhesMensagemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/detalhes-mensagem/detalhes-mensagem.html',
  providers: [MessageService]
})
export class DetalhesMensagemPage {

  msg: Message;

  constructor( public nav: NavController, public params: NavParams, public messageService: MessageService) {
    this.msg = params.get('message');
  }

}
