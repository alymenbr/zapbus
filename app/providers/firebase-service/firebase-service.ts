import {Injectable, Inject} from 'angular2/core';

@Injectable()
export class FirebaseService {

  FIREBASE_URL = 'https://zapbus.firebaseio.com/';
  firebase: Firebase;

  constructor() {
      this.firebase = new Firebase( this.FIREBASE_URL );
  }

  syncToExternalList(list, path) {
      this.wrapRemoteOps(list, this.firebase.child(path) );
  }

  wrapRemoteOps(list, firebaseRef) {

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

  add(object, path){
    this.firebase.child(path).push(object);
  }

  wrapLocalOps(list, firebaseRef) {
     // we can hack directly on the array to provide some convenience methods
     list.$add = function(data) {
        return firebaseRef.push(data);
     };
     list.$remove = function(key) {
       firebaseRef.child(key).remove();
     };
     list.$set = function(key, newData) {
       // make sure we don't accidentally push our $id prop
       if( newData.hasOwnProperty('$id') ) { delete newData.$id; }
       firebaseRef.child(key).set(newData);
     };
     list.$indexOf = function(key) {
       return this.positionFor(list, key); // positionFor in examples above
     }
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
