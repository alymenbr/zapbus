import {Injectable} from '@angular/core';
import {Facebook, Geolocation} from 'ionic-native';
import {User} from '../../models/user/user';
import {GeoLocation} from '../../models/geolocation/geolocation';
import {Platform, Events} from 'ionic-angular';

import {AuthService} from '../auth-service/auth-service';

@Injectable()
export class UserService{

  constructor(public platform: Platform, public auth: AuthService){

  }

  isLoggedIn(){
    return this.auth.authenticated();
  }

  getUserLocation(): Promise<GeoLocation> {
    var promiseResult;
    var promiseError;
    let promise = new Promise<Geolocation>((resolve, reject) => {promiseResult = resolve; promiseError = reject});

    Geolocation.getCurrentPosition().then( data => {
      let geolocation = new GeoLocation(data.coords.latitude, data.coords.longitude);
      promiseResult( geolocation );
    })
    .catch( (error) => {
      console.log("UserService.getUserLocation(): " + error.errorMessage);
      promiseError(error.errorMessage);
    });

    return promise
  }

  logout(){
      this.auth.logout()
  }

  login() {
    this.auth.login()

    // .then( user => {
    //
    //   let existingUser = new User( this.auth.user.sub );
    //   existingUser.name = this.auth.user.name;
    //   existingUser.avatarUrl = this.auth.user.picture;
    //   UserService.currentUser = existingUser;
    //
    //   // Publish the Login Event
    //   this.events.publish('user:login');
    //
    //   // Call the next app page
    //   currentNav.setRoot(nextPage);
    // })
    // .catch( (error) => {
    //   console.log("UserService.login(): " + error.errorMessage);
    // });
  }

  getCurrentUser(): User {
    return this.auth.user;
  }

  setMap(mapVar: any, tagId: string, latitude: any, longitude: any) {
    let latLng
    if(latitude && longitude) {
      latLng = new google.maps.LatLng(latitude, longitude); // Parameter Location
    } else {
      latLng = new google.maps.LatLng(-19.9188019, -43.9407475); // Praça 7, BH - MG
    }

    let mapOptions = {
      center: latLng,
      minZoom: 15,
      zoom: 17,
      //MaxZoom: 19,
      draggable: false,
      streetViewControl: false,
      overviewMapControl: false,
      mapTypeControl: false,
      clicablelabels: false,
      panControl: true,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }

    mapVar = new google.maps.Map(document.getElementById( tagId ), mapOptions);

    let marker = new google.maps.Marker({
      map: mapVar,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }
}
