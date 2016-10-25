import {NavController, LoadingController} from 'ionic-angular';
import {Component} from '@angular/core';
import {DetalhesMensagemPage} from '../detalhes-mensagem/detalhes-mensagem';
import {MessageService} from '../../providers/message-service/message-service';
import {UserService} from '../../providers/user-service/user-service';
import {CriarMensagemPage} from '../criar-mensagem/criar-mensagem';
import {Message} from '../../models/message/message';
import {TimeToString} from '../../pipes/time-to-string';
import {DistanceToString} from '../../pipes/distance-to-string';

/*
  Generated class for the MensagensProximasPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/mensagens-proximas/mensagens-proximas.html',
  pipes: [TimeToString, DistanceToString]
})
export class MensagensProximasPage {

  messages: Array<Message>;
  loading: any;

  constructor( public loadingCtrl: LoadingController, public nav: NavController, public msgService: MessageService, public userService: UserService) {

  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({content: 'Procurando...'});
    this.loading.present();

    this.userService.getUserLocation().then( (result) => {
      this.carregarMensagens(result.latitude, result.longitude);
    })

  }

  carregarMensagens(newLatitude, newLongitude) {

    this.messages = new Array<Message>();
    this.msgService.syncMensagensProximas(this.messages, newLatitude, newLongitude).then( (result) => {
      this.loading.dismiss();
    });
  }

  openCriarMensagemPage(){
    this.nav.push(CriarMensagemPage, {messageList: this.messages});
  }

  openDetalhesMensagemPage(currentMessage){
    this.nav.push(DetalhesMensagemPage, {message: currentMessage});
  }

  zeroMessages() {
    return this.messages && this.messages.length == 0;
  }
}
