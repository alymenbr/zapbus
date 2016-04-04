import {Pipe} from 'angular2/core';

@Pipe({
  name: 'timeToString'
})
export class TimeToString {

  dateFormat = {  year: "numeric", month: "short", day: "numeric",
                  hour: "2-digit", minute: "2-digit", hour12: false
  };

  transform(value, args) {
    if(!value) return '';

    return new Date(value).toLocaleDateString("pt-BR", this.dateFormat);
  }
}
