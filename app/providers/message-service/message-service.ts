import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Message} from '../../models/message/message';
import {Comment} from '../../models/comment/comment';

/*
  Generated class for the MessageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageService {

  static URL = 'https://zapbus.firebaseio.com/messages';
  firebase: Firebase;

  static mockMessageList = [  new Message('5102A', 'O motorista de 7:15h é muito mal educado!', 'Tiffany'),
                              new Message('SC03D', 'O motorista de 20:00h é tão rápido quanto meus punhos!', 'McGreggor')];

  constructor(public http: Http) {
      this.firebase = new Firebase( MessageService.URL );
      this.firebase.push( MessageService.mockMessageList[0] );
      this.firebase.push( MessageService.mockMessageList[1] );
  }

  syncMensagensProximas(messageList) {

    this.firebase.on('child_added', function _add(snap, prevChild) {
      var data = snap.val();
      data.$id = snap.key(); // assumes data is always an object
      var pos = MessageService.positionAfter(messageList, prevChild);
      messageList.splice(pos, 0, data);
    });

    this.firebase.on('child_removed', function _remove(snap) {
      var i = MessageService.positionFor(messageList, snap.key());
      if( i > -1 ) {
        messageList.splice(i, 1);
      }
    });

    this.firebase.on('child_changed', function _change(snap) {
      var i = MessageService.positionFor(messageList, snap.key());
      if( i > -1 ) {
        messageList[i] = snap.val();
        messageList[i].$id = snap.key(); // assumes data is always an object
      }
    });

    this.firebase.on('child_moved', function _move(snap, prevChild) {
      var curPos = MessageService.positionFor(messageList, snap.key());
      if( curPos > -1 ) {
        var data = messageList.splice(curPos, 1)[0];
        var newPos = MessageService.positionAfter(messageList, prevChild);
        messageList.splice(newPos, 0, data);
      }
    });

  }

  // similar to indexOf, but uses id to find element
  static positionFor(list, key) {
    for(var i = 0, len = list.length; i < len; i++) {
      if( list[i].$id === key ) {
        return i;
      }
    }
    return -1;
  }

  // using the Firebase API's prevChild behavior, we
  // place each element in the list after it's prev
  // sibling or, if prevChild is null, at the beginning
  static positionAfter(list, prevChild) {
    if( prevChild === null ) {
      return 0;
    }
    else {
      var i = MessageService.positionFor(list, prevChild);
      if( i === -1 ) {
        return list.length;
      }
      else {
        return i+1;
      }
    }
  }










  getMinhasMensagens(){
    return MessageService.mockMessageList;
  }

  addMessage(busLine: string, msgDetail: string){
    var newMessage = new Message(busLine, msgDetail, 'Eu');

    MessageService.mockMessageList.push(newMessage);
    this.firebase.push( newMessage );
  }

  addComment(message: Message, comment: string){
    var newComment = new Comment('Eu', 'img/avatar.png', comment);
    message.comments.push(newComment);
  }

  approveMessage(message: Message){
    message.approvals++;
    message.points++;
  }

  reproveMessage(message: Message){
    message.reprovals++;
    message.points--;
    message.points--;
  }
}
