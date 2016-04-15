
export class Comment {

  time: number;
  constructor(  public author: string,
                public avatarUrl: string,
                public authorId: string,
                public detail: string){
                  this.time = new Date().getTime();
                }
}
