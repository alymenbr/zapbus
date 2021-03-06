import {NavController, LoadingController} from 'ionic-angular';
import {Component} from '@angular/core';
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
@Component({
  templateUrl: 'build/pages/minhas-mensagens/minhas-mensagens.html',
  pipes: [TimeToString]
})
export class MinhasMensagensPage {

  messages: Array<Message>;
  loading: any;

  constructor( public loadingCtrl: LoadingController, public nav: NavController, public msgService: MessageService, public userService: UserService) {

  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({content: 'Procurando...'});
    this.loading.present();
    this.carregarMensagens();
  }

  carregarMensagens() {
    this.messages = new Array<Message>();
    this.msgService.syncMinhasMensagens(this.messages).then( (result) => {
      this.loading.dismiss();
    });
  }

  zeroMessages() {
    return this.messages && this.messages.length == 0;
  }

  openDetalhesMensagemPage(currentMessage){
    this.nav.push(DetalhesMensagemPage, {message: currentMessage});
  }

  goBack() {
    this.nav.pop();
  }

}
