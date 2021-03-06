// app/services/auth/auth.ts

import {Storage, LocalStorage, Events} from 'ionic-angular';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {User} from '../../models/user/user';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  lock = new Auth0Lock('cm2vPMDgI1e75QAcPY8wkOqhy7hFeXRN', 'alymenbr.auth0.com');
  local: Storage = new Storage(LocalStorage);
  user: User;

  constructor(private authHttp: AuthHttp, public events: Events) {

    // If there is a profile saved in local storage
    this.local.get('profile').then(profile => {

      let json = JSON.parse(profile)
      this.user = this.parseUser(json);

      // Publish the Update
      this.events.publish('user:login')

    }).catch(error => {
      console.log(error);
    });
  }

  public authenticated() {

    // Check if there's an unexpired JWT
    return this.user;
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show({
      dict: 'pt-br',
      icon: 'img/zapbus_h58.png',
      socialBigButtons: true,
      disableResetAction: true,
      closable: false,
      loginAfterSignup: true,
      sso: false,

      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, (err, profile, token, accessToken, state, refreshToken) => {
      if (err) {
        console.log(err);
      }


      // If authentication is successful, save the items
      // in local storage
      this.local.set('profile', JSON.stringify(profile));
      this.local.set('id_token', token);
      this.local.set('refresh_token', refreshToken);

      this.user = this.parseUser(profile);

      // Publish the Update
      this.events.publish('user:login')

      // this.lock.hide()
    });
  }

  public logout() {
    this.local.remove('profile');
    this.local.remove('id_token');
    this.local.remove('refresh_token');
    this.user = null;

  }

  public parseUser(jsonProfile): User {
    if(!jsonProfile)
      return null

    let newUser = new User(jsonProfile.user_id)
    newUser.name = jsonProfile.name
    newUser.avatarUrl = jsonProfile.picture

    return newUser
  }
}
