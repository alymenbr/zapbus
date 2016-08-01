import {Pipe} from '@angular/core';

@Pipe({
  name: 'distanceToString'
})
export class DistanceToString {

  dateFormat = {  year: "numeric", month: "short", day: "numeric",
                  hour: "2-digit", minute: "2-digit", hour12: false
  };

  transform(value, args) {
    if(value == null) return '0km';
    return value.toFixed(1) + 'km';
  }
}
