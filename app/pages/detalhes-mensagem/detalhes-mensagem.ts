import {Page, NavController, NavParams} from 'ionic-angular';
import {Message, MessageService} from '../../providers/message-service/message-service';

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

  message: Message;

  constructor( public nav: NavController, public params: NavParams, public messageService: MessageService) {
    this.message = params.get('message');
  }

}
