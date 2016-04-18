import {Page, NavController} from 'ionic-angular';
import {MessageService} from '../../providers/message-service/message-service';
import {UserService} from '../../providers/user-service/user-service';
import {GeoLocation} from '../../models/geolocation/geolocation';

/*
  Generated class for the CriarMensagemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/criar-mensagem/criar-mensagem.html'
})
export class CriarMensagemPage {

  linhaOnibus: string;
  novaMensagem: string;
  location: GeoLocation;
  map;


  constructor( public nav: NavController, public messageService: MessageService, public userService: UserService) {
    document.addEventListener('backbutton', () => this.nav.pop() );
  }

  onPageWillEnter() {
    this.setLocation();
  }

  setLocation(){
    this.userService.getUserLocation().then( (result) => {
      this.loadMap(result);
      this.location = result;
    })}

  loadMap(location: GeoLocation){
    this.userService.setMap(this.map, "map", location.latitude, location.longitude);
  }

  saveMessage(){
    this.messageService.addMessage(this.linhaOnibus, this.novaMensagem, this.location);
    this.linhaOnibus = '';
    this.novaMensagem = '';

    this.nav.pop();
  }

}
