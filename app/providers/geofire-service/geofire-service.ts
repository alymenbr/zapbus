import {Injectable, Inject} from 'angular2/core';

@Injectable()
export class GeofireService {

  FIREBASE_URL = 'https://zapbus.firebaseio.com/';
  geofire: GeoFire;

  constructor() {
      this.geofire = new GeoFire( this.FIREBASE_URL );
  }

  add(key, latitude, longitude){
    this.geofire.set(key, [latitude, longitude]);
  }
}
