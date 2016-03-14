import {Comment} from '../comment/comment';

export class Message {
  linhaOnibus: string
  detail: string;
  authorName: string;
  avatarUrl: string;
  date: Date;
  approvals: number;
  reprovals: number;
  points: number;
  coordinates: string;
  mapUrl: string ;
  comments: Array<Comment>;

  constructor(  busLine: string, newDetail: string, newAuthor: string){
                  this.linhaOnibus = busLine;
                  this.detail = newDetail;
                  this.authorName = newAuthor;
                  this.avatarUrl = 'img/avatar.png';
                  this.date = new Date();
                  this.approvals = 1;
                  this.reprovals = 0
                  this.points = 1;
                  this.coordinates = 'Coordenadas';
                  this.mapUrl = 'img/maps.png';
                  this.comments = Array<Comment>();
                }

    /* TODO: Saber se quem fez +1 foi o usuário atual */
    /* TODO: Saber se quem fez -1 foi o usuário atual */
    /* TODO: Saber a linha de ônibus da mensagem */
    /* Deixar mensagens iniciais nas coordenadas de cada capital */
    /* Adicionar comentários */
}
