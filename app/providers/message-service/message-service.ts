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
  addMessage(busLine: string, msgDetail: string){
    var newMessage = new Message(busLine, msgDetail, 'Eu');
    this.firebaseService.add( newMessage, this.PATH );
  }

  /* TODO */
  addComment(message, comment: string){
    var newComment = new Comment('Eu', 'img/avatar.png', comment);

    if(!message.comments) message.comments = [];
    message.comments.push(newComment);

    var commentsPath = this.PATH + '/' + message.$id + '/' + 'comments';
    this.firebaseService.add( newComment, commentsPath);
  }

  /* TODO */
  approveMessage(message: Message){
    message.approvals++;
    message.points++;

    this.firebaseService.update( message, {approvals: message.approvals, points: message.points}, this.PATH );
  }

  /* TODO */
  reproveMessage(message: Message){
    message.reprovals++;
    message.points--;
    message.points--;

    this.firebaseService.update( message, {reprovals: message.reprovals, points: message.points}, this.PATH );
  }
}
