import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Message} from '../../models/message/message';
import {Comment} from '../../models/comment/comment';
import {GeoLocation} from '../../models/geolocation/geolocation';
import {UserService} from '../user-service/user-service';
import {FirebaseService} from '../firebase-service/firebase-service';

/*
  Generated class for the MessageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageService {

  PATH = 'messages';

  constructor(public firebaseService: FirebaseService, public userService: UserService) {
  }

  syncMensagensProximas(messageList, latitude, longitude): Promise<number> {
    return this.firebaseService.syncListByDistance(messageList, this.PATH, latitude, longitude);
  }

  syncMinhasMensagens(messageList): Promise<number> {
    let currentUser = this.userService.getCurrentUser();
    return this.firebaseService.syncListByUser(messageList, this.PATH, currentUser.facebookId);
  }

  syncComentariosMensagem(message, commentsList) {
    var commentsPath = this.PATH + '/' + message.key + '/' + 'comments';
    this.firebaseService.syncList(commentsList, commentsPath);
  }

  addMessage(busLine: string, msgDetail: string, location: GeoLocation){
    let currentUser = this.userService.getCurrentUser();
    let newMessage = new Message(busLine, msgDetail, currentUser.name, currentUser.avatarUrl, currentUser.facebookId);

    let remoteMsg = this.firebaseService.add( newMessage, this.PATH );
    this.approveMessage(newMessage);

    if(location)
      this.firebaseService.addLocation(newMessage.key, location.latitude, location.longitude);
  }

  addComment(message, comment: string){
    let currentUser = this.userService.getCurrentUser();
    var newComment = new Comment(currentUser.name, currentUser.avatarUrl, currentUser.facebookId, comment);

    var commentsPath = this.PATH + '/' + message.key + '/' + 'comments';
    this.firebaseService.add( newComment, commentsPath);
  }

  getLocation(message): any{
    return this.firebaseService.getLocation(message.key);
  }

  approveMessage(message){
    let currentUser = this.userService.getCurrentUser();

    if(Message.hasApproved(message, currentUser.facebookId) )
      return; // Can't approve twice!

    if(Message.hasReproved(message, currentUser.facebookId) ){
      // undo reproval
      message.reprovals--;
      message.points++;
      message.points++;
    }

    if(!message.approvalHash)
      message.approvalHash = {};

    if(!message.reprovalHash)
      message.reprovalHash = {};

    message.approvalHash[currentUser.facebookId] = true;
    message.reprovalHash[currentUser.facebookId] = null;

    message.approvals++;
    message.points++;

    this.firebaseService.update( message, {approvals: message.approvals, reprovals: message.reprovals, points: message.points, approvalHash: message.approvalHash, reprovalHash: message.reprovalHash}, this.PATH );
  }

  reproveMessage(message: Message){
    let currentUser = this.userService.getCurrentUser();

    if(Message.hasReproved(message, currentUser.facebookId) )
      return; // Can't reprove twice!

    if(Message.hasApproved(message, currentUser.facebookId) ){
      // undo approval
      message.approvals--;
      message.points--;
    }

    if(!message.approvalHash)
      message.approvalHash = {};

    if(!message.reprovalHash)
      message.reprovalHash = {};

    message.approvalHash[currentUser.facebookId] = null;
    message.reprovalHash[currentUser.facebookId] = true;

    message.reprovals++;
    message.points--;
    message.points--;

    this.firebaseService.update( message, {approvals: message.approvals, reprovals: message.reprovals, points: message.points, approvalHash: message.approvalHash, reprovalHash: message.reprovalHash}, this.PATH );
  }
}
