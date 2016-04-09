import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Message} from '../../models/message/message';
import {Comment} from '../../models/comment/comment';
import {GeoLocation} from '../../models/geolocation/geolocation';
import {FirebaseService} from '../firebase-service/firebase-service';
import {GeofireService} from '../geofire-service/geofire-service';

/*
  Generated class for the MessageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageService {

  PATH = 'messages';

  constructor(public firebaseService: FirebaseService, public geofireService: GeofireService) {
  }

  syncMensagensProximas(messageList) {
    this.firebaseService.syncToExternalList(messageList, this.PATH);
  }

  /* TODO */
  syncMinhasMensagens(messageList){
    this.firebaseService.syncToExternalList(messageList, this.PATH);
  }

  /* TODO */
  addMessage(busLine: string, msgDetail: string, location: GeoLocation){
    var newMessage = new Message(busLine, msgDetail, 'Eu');
    let remoteMsg = this.firebaseService.add( newMessage, this.PATH );
    this.geofireService.add(remoteMsg, location.latitude, location.longitude);
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
