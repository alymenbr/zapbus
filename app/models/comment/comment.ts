
export class Comment {

  public date: Date;
  constructor(  public author: string,
                public avatarUrl: string,
                public detail: string){
                  this.date = new Date();
                }
}
