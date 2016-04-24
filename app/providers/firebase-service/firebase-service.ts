import {Injectable, Inject} from 'angular2/core';
import * as Firebase from 'firebase';
import * as GeoFire from 'geofire';

@Injectable()
export class FirebaseService {

  FIREBASE_URL = 'https://zapbus.firebaseio.com/';
  static firebase: Firebase;
  static geofire: GeoFire;

  constructor() {
      FirebaseService.firebase = new Firebase( this.FIREBASE_URL );
      FirebaseService.geofire = new GeoFire(FirebaseService.firebase);
  }


  /* ------------------------ */
  /*          FIREBASE        */
  /* ------------------------ */
  syncList(list, path) {
    let firebaseRef = FirebaseService.firebase.child(path);

    firebaseRef.on('child_added', function _add(snap, prevChild) {
      let message = snap.val();
      //message.distance = 0;
      list.push( snap.val() );
    });
  }

  syncListByUser(list, path, userId) {
    let firebaseRef = FirebaseService.firebase.child(path);

    firebaseRef.orderByChild("authorId").equalTo( userId ).on('child_added', function _add(snap, prevChild) {
      let message = snap.val();
      //message.distance = 0;
      list.push( snap.val() );
    });
  }

  add(object, path): Firebase {
    let remote = FirebaseService.firebase.child(path).push();
    object.key = remote.key();
    remote.set(object);
    return remote;
  }

  update(object, values, path) {
    FirebaseService.firebase.child(path).child(object.key).update(values);
  }



  /* ------------------------ */
  /*          GEOFIRE         */
  /* ------------------------ */
  syncListByDistance(list, path, latitude, longitude) {
    var geoQuery = FirebaseService.geofire.query({
      center: [latitude, longitude],
      radius: 10.5
    });


    geoQuery.on('key_entered', function _add(key, location, distance) {

      let firebaseQuery = FirebaseService.firebase.child(path).child(key);
      firebaseQuery.once("value", function(data) {
        let message = data.val();

        if(message.points > 0)
        {
          message.distance = distance;

          var pos = FirebaseService.selectPositionByDistance(list, distance);
          list.splice(pos, 0, message);
        }
      });
    });

    geoQuery.on('ready', function () {
      geoQuery.cancel();
    });
  }

  addLocation(key, latitude, longitude){
    FirebaseService.geofire.set(key, [latitude, longitude]);
  }

  getLocation(key): any {
    return FirebaseService.geofire.get(key);
  }

  static selectPositionByDistance(list, distance): any {
    for(var i = 0, len = list.length; i < len; i++) {
      if( list[i].distance > distance ) {
        return i;
      }
    }

    return list.length;
  }
}
