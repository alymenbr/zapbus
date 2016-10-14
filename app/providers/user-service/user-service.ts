import {Injectable} from '@angular/core';
import {Facebook, Geolocation} from 'ionic-native';
import {User} from '../../models/user/user';
import {GeoLocation} from '../../models/geolocation/geolocation';
import {Platform} from 'ionic-angular';

@Injectable()
export class UserService{

  static CURRENT_USER_FIELD = "currentUser";
  static currentUser: User;

  constructor(public platform: Platform){
    this.loadUser();
  }

  isLoggedIn(){
    return UserService.currentUser? true: false;
  }

  loadUser(){
    if(!UserService.currentUser && window.localStorage[UserService.CURRENT_USER_FIELD])
      UserService.currentUser = JSON.parse(window.localStorage[UserService.CURRENT_USER_FIELD]);

    if( !this.platform.is('cordova') ){
      let defaultUser = new User("980426748671892");
      defaultUser.name = "Pedro";
      defaultUser.avatarUrl = "https://graph.facebook.com/67563683055/picture?type=large&w‌​idth=60&height=60";
      UserService.currentUser = defaultUser;
    }

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
      window.localStorage[UserService.CURRENT_USER_FIELD] = null;
      Facebook.logout();
  }

  login(): Promise<User>{
    var promiseResult;
    var promiseError;
    let promise = new Promise<User>((resolve, reject) => {promiseResult = resolve; promiseError = reject});

    let callLogin = Facebook.login(['public_profile']);

    callLogin.then( (response) => {
        UserService.currentUser = new User(response.authResponse.userID);

        Facebook.api('me?fields=name,email', ['public_profile']).then( (response) => {
          UserService.currentUser.name = response.name;

          Facebook.api('me/picture?redirect=false&height=60&width=60', []).then( (pic_response) => {
              UserService.currentUser.avatarUrl = pic_response.data.url;
              this.saveUser();
              promiseResult(this);
            })
          .catch( (error) => console.log("UserService.login(): " + error.errorMessage) );
        })
        .catch( (error) => console.log("UserService.login(): " + error.errorMessage) );
    })
    .catch( (error) => {
      console.log("UserService.login(): " + error.errorMessage);
      promiseError(error.errorMessage);
    });

    return promise;
  }

  private saveUser(){
    window.localStorage[UserService.CURRENT_USER_FIELD] = JSON.stringify(UserService.currentUser);
  }

  getCurrentUser(): User {
    return UserService.currentUser;
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
