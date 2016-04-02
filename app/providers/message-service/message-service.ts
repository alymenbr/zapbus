import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Message} from '../../models/message/message';
import {Comment} from '../../models/comment/comment';
import {FirebaseService} from '../firebase-service/firebase-service';

/*
  Generated class for the MessageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageService {

  PATH = 'messages';

  static mockMessageList = [  new Message('5102A', 'O motorista de 7:15h é muito mal educado!', 'Tiffany'),
                              new Message('SC03D', 'O motorista de 20:00h é tão rápido quanto meus punhos!', 'McGreggor')];

  constructor(public firebaseService: FirebaseService) {
  }

  syncMensagensProximas(messageList) {
    this.firebaseService.syncToExternalList(messageList, this.PATH);
  }

  /* TODO */
  getMinhasMensagens(){
    return MessageService.mockMessageList;
  }

  /* TODO */
  addMessage(messageList, busLine: string, msgDetail: string){
    var newMessage = new Message(busLine, msgDetail, 'Eu');
    this.firebaseService.add( newMessage, this.PATH );
  }

  /* TODO */
  addComment(message: Message, comment: string){
    var newComment = new Comment('Eu', 'img/avatar.png', comment);
    message.comments.push(newComment);
  }

  /* TODO */
  approveMessage(message: Message){
    message.approvals++;
    message.points++;
  }

  /* TODO */
  reproveMessage(message: Message){
    message.reprovals++;
    message.points--;
    message.points--;
  }
}
