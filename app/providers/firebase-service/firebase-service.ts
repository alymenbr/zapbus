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
      list.push( snap.val() );

      /*
      var data = snap.val();
      data.$id = snap.key(); // assumes data is always an object
      var pos = FirebaseService.positionAfter(list, prevChild);
      list.splice(pos, 0, data);
      */
    });

    firebaseRef.on('child_removed', function _remove(snap) {
      var i = FirebaseService.positionFor(list, snap.key());
      if( i > -1 ) {
        list.splice(i, 1);
      }
    });

    firebaseRef.on('child_changed', function _change(snap) {
      var i = FirebaseService.positionFor(list, snap.key());
      if( i > -1 ) {
        list[i] = snap.val();
        list[i].$id = snap.key(); // assumes data is always an object
      }
    });

    firebaseRef.on('child_moved', function _move(snap, prevChild) {
      var curPos = FirebaseService.positionFor(list, snap.key());
      if( curPos > -1 ) {
        var data = list.splice(curPos, 1)[0];
        var newPos = this.positionAfter(list, prevChild);
        list.splice(newPos, 0, data);
      }
    });

  }

  add(object, path): Firebase {
    let remote = FirebaseService.firebase.child(path).push();
    remote.set(object);
    return remote;
  }

  update(object, values, path) {
    FirebaseService.firebase.child(path).child(object.$id).update(values);
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
        //message.distance = distance;

        //var pos = FirebaseService.positionAfter(list, prevChild);
        list.push(message)
      });
    });

    geoQuery.on('key_exited', function _remove(key, location, distance) {
      var i = FirebaseService.positionFor(list, key);
      if( i > -1 ) {
        list.splice(i, 1);
      }
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




  /* ------------------------------------- */
  /*                 UTIL                  */
  /* ------------------------------------- */

  // similar to indexOf, but uses id to find element
  static positionFor(list, key) {
    for(var i = 0, len = list.length; i < len; i++) {
      if( list[i].$id === key ) {
        return i;
      }
    }
    return -1;
  }

  // using the Firebase API's prevChild behavior, we
  // place each element in the list after it's prev
  // sibling or, if prevChild is null, at the beginning
  static positionAfter(list, prevChild) {
    if( prevChild === null ) {
      return 0;
    }
    else {
      var i = this.positionFor(list, prevChild);
      if( i === -1 ) {
        return list.length;
      }
      else {
        return i+1;
      }
    }
  }
}
