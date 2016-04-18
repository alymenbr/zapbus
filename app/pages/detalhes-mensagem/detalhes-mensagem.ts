import {Page, NavController, NavParams} from 'ionic-angular';
import {MessageService} from '../../providers/message-service/message-service';
import {UserService} from '../../providers/user-service/user-service';
import {Message} from '../../models/message/message';
import {Comment} from '../../models/comment/comment';
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
  comentarios: Array<Comment>;
  map: any;
  novoComentario: string;

  constructor( public nav: NavController, public params: NavParams, public messageService: MessageService, public userService: UserService) {
    this.msg = params.get('message');
  }

  onPageWillEnter() {
    this.carregarComentarios();
    this.carregarLocalizacao();
  }

  carregarComentarios() {
    this.comentarios = new Array<Comment>();
    this.messageService.syncComentariosMensagem(this.msg, this.comentarios);
  }

  carregarLocalizacao(){
    this.messageService.getLocation(this.msg).then( (location) => {
      this.userService.setMap(this.map, "map", location[0], location[1])
    });
  }

  sendComment(){
    this.messageService.addComment(this.msg, this.novoComentario);
    this.novoComentario = '';
  }

  fillAprovallText(): string {
    return this.hasApproved()? "Você aprovou!" : "Aprovar";
  }

  fillReprovallText(): string {
    return this.hasReproved()? "Você reprovou!" : "Reprovar";
  }

  hasApproved(){
    let currentUser = this.userService.getCurrentUser();
    return Message.hasApproved(this.msg, currentUser.facebookId);

  }

  hasReproved(){
    let currentUser = this.userService.getCurrentUser();
    return Message.hasReproved(this.msg, currentUser.facebookId);
  }

  approveMessage(){
    this.messageService.approveMessage(this.msg);
  }

  reproveMessage(){
    this.messageService.reproveMessage(this.msg);
  }


}
