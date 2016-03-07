import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';

export class Comments {
  constructor(  public sequence: number,
                public detail: string,
                public author: string,
                public date: Date){}
}

export class Message {
  detail: string;
  author: string;
  date: Date;
  approvals: number;
  reprovals: number;
  points: number;
  coordinates: string;
  mapUrl: string ;
  comments: Array<Comments>;

  constructor(  newDetail: string, newAuthor: string){
                  this.detail = newDetail;
                  this.author = newAuthor;
                  this.date = new Date();
                  this.approvals = 1;
                  this.reprovals = 0
                  this.points = 1;
                  this.coordinates = 'Coordenadas'
                  this.mapUrl = 'Mapa'
                  this.comments = Array<Comments>();
                }

    /* TODO: Saber se quem fez +1 foi o usuário atual */
    /* TODO: Saber se quem fez -1 foi o usuário atual */
    /* TODO: Saber a linha de ônibus da mensagem */
    /* Deixar mensagens iniciais nas corrdenadas de cada capital */
}

/*
  Generated class for the MessageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageService {

  constructor(public http: Http) {
    /* CAREFUL! WILL BE CALLED ON EACH PAGE CONSTRUCTOR */
  }

  getMensagensProximas(){
    return [new Message('Mensagem1', 'Autor1'), new Message('Mensagem2', 'Autor2')];
  }

  getMinhasMensagens(){
    return [new Message('Minha1', 'Eu'), new Message('Minha2', 'Eu2')];
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
