import {Comment} from '../comment/comment';
import {GeoLocation} from '../geolocation/geolocation';

export class Message {
  linhaOnibus: string
  detail: string;
  authorName: string;
  avatarUrl: string;
  authorId: string;
  approvals: number;
  approvalHash: {};
  reprovals: number;
  reprovalHash: {};
  points: number;
  time: number;
  comments: Array<Comment>;


  constructor(  busLine: string, newDetail: string, authorName: string, avatarUrl: string, authorId: string){
                  this.linhaOnibus = busLine;
                  this.detail = newDetail;
                  this.authorName = authorName;
                  this.avatarUrl = avatarUrl;
                  this.authorId = authorId;
                  this.time = new Date().getTime();
                  this.approvals = 1;
                  this.reprovals = 0
                  this.points = 1;
                  this.approvalHash = {authorId: true};
                  this.reprovalHash = {};
                  this.comments = Array<Comment>();
                }

    /* TODO: Saber se quem fez +1 foi o usuário atual */
    /* TODO: Saber se quem fez -1 foi o usuário atual */
    /* Deixar mensagens iniciais nas coordenadas de cada capital */

  static hasApproved(message: Message, userId: string): boolean {
    if( message.approvalHash[userId] != null )
      return true;

    return false;
  }

  static hasReproved(message: Message, userId: string): boolean {
    if( message.reprovalHash[userId] != null )
      return true;

    return false;
  }

}
