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

  static mockMessageList = [  new Message('5102A', 'O motorista de 7:15h é muito mal educado!', 'Tiffany'),
                              new Message('SC03D', 'O motorista de 20:00h é tão rápido quanto meus punhos!', 'McGreggor')];

  constructor(public http: Http) {
    /* CAREFUL! WILL BE CALLED ON EACH PAGE CONSTRUCTOR */
  }

  getMensagensProximas(){
    return MessageService.mockMessageList;
  }

  getMinhasMensagens(){
    return MessageService.mockMessageList;
  }

  addMessage(busLine: string, msgDetail: string){
    var newMessage = new Message(busLine, msgDetail, 'Eu');
    MessageService.mockMessageList.push(newMessage);
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
/*
  data;

  constructor(public http: Http) {
    this.data = null;
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
  */
}
