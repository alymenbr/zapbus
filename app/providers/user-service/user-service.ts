import {Injectable} from 'angular2/core';
import {Facebook, Geolocation} from 'ionic-native';
import {User} from '../../models/user/user';
import {GeoLocation} from '../../models/geolocation/geolocation';
import {Http} from 'angular2/http';

@Injectable()
export class UserService{

  static CURRENT_USER_FIELD = "currentUser";
  static currentUser: User;

  constructor(http: Http){
    this.loadUser();
  }

  isLoggedIn(){
    return UserService.currentUser;
  }

  loadUser(){
    if(!UserService.currentUser && window.localStorage[UserService.CURRENT_USER_FIELD])
      UserService.currentUser = JSON.parse(window.localStorage[UserService.CURRENT_USER_FIELD]);
  }

  getUserLocation(): Promise<Geolocation> {
    var promiseResult;
    var promiseError;
    let promise = new Promise<Geolocation>((resolve, reject) => {promiseResult = resolve; promiseError = reject});

    Geolocation.getCurrentPosition().then( data => {
      let geolocation = new GeoLocation(data.coords.latitude, data.coords.longitude);
      promiseResult( geolocation );
    })
    .catch( (error) => {
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
          .catch( (error) => promiseError(error.errorMessage));
        })
        .catch( (error) => promiseError(error.errorMessage));
    })
    .catch( (error) => {
      promiseError(error.errorMessage);
    });

    return promise;
  }

  private saveUser(){
    window.localStorage[UserService.CURRENT_USER_FIELD] = JSON.stringify(UserService.currentUser);
  }
}
