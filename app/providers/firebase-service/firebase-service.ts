import {Injectable, Inject} from 'angular2/core';
import * as Firebase from 'firebase';
import * as GeoFire from 'geofire';

@Injectable()
export class FirebaseService {

  FIREBASE_URL = 'https://zapbus.firebaseio.com/';
  firebase: Firebase;
  geofire: GeoFire;

  constructor() {
      this.firebase = new Firebase( this.FIREBASE_URL );
      this.geofire = new GeoFire(this.firebase);
  }


  /* ------------------------ */
  /*          FIREBASE        */
  /* ------------------------ */
  syncList(list, path) {
    let firebaseRef = this.firebase.child(path);

    firebaseRef.on('child_added', function _add(snap, prevChild) {
      var data = snap.val();
      data.$id = snap.key(); // assumes data is always an object
      var pos = FirebaseService.positionAfter(list, prevChild);
      list.splice(pos, 0, data);
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
    let remote = this.firebase.child(path).push();
    remote.set(object);
    return remote;
  }

  update(object, values, path) {
    this.firebase.child(path).child(object.$id).update(values);
  }



  /* ------------------------ */
  /*          GEOFIRE         */
  /* ------------------------ */
  addLocation(key, latitude, longitude){
    this.geofire.set(key, [latitude, longitude]);
  }

  getLocation(key) {
    this.geofire.get(key).then(function(location) {
      if (location === null) {
        console.log("Provided key is not in GeoFire");
      }
      else {
        console.log("Provided key has a location of " + location);
      }
    }, function(error) {
      console.log("Error: " + error);
    });
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
