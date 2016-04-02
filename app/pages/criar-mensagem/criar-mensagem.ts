import {Page, NavController} from 'ionic-angular';
import {MessageService} from '../../providers/message-service/message-service';

/*
  Generated class for the CriarMensagemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/criar-mensagem/criar-mensagem.html',
  providers: []  
})
export class CriarMensagemPage {

  linhaOnibus: string;
  novaMensagem: string;

  constructor( public nav: NavController, public messageService: MessageService) {

  }

  saveMessage(){
    this.messageService.addMessage(this.linhaOnibus, this.novaMensagem);
    this.linhaOnibus = '';
    this.novaMensagem = '';

    this.nav.pop()
  }

}
