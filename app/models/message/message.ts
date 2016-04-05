import {Comment} from '../comment/comment';
import {GeoLocation} from '../geolocation/geolocation';

export class Message {
  linhaOnibus: string
  detail: string;
  authorName: string;
  avatarUrl: string;
  approvals: number;
  reprovals: number;
  points: number;
  latitude: number;
  longitude: number;
  mapUrl: string ;
  time: number;
  comments: Array<Comment>;


  constructor(  busLine: string, newDetail: string, newAuthor: string, newLocation: GeoLocation){
                  this.linhaOnibus = busLine;
                  this.detail = newDetail;
                  this.authorName = newAuthor;
                  this.avatarUrl = 'img/avatar.png';
                  this.time = new Date().getTime();
                  this.approvals = 1;
                  this.reprovals = 0
                  this.points = 1;
                  this.latitude = newLocation? newLocation.latitude : null
                  this.longitude = newLocation? newLocation.longitude : null;
                  this.mapUrl = 'img/maps.png';
                  this.comments = Array<Comment>();
                }

    /* TODO: Saber se quem fez +1 foi o usuário atual */
    /* TODO: Saber se quem fez -1 foi o usuário atual */
    /* TODO: Saber a linha de ônibus da mensagem */
    /* Deixar mensagens iniciais nas coordenadas de cada capital */
    /* Adicionar comentários */
}
