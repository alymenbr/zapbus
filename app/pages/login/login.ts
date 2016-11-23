import {Platform, Events} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {UserService} from "../../providers/user-service/user-service";
import {PrincipalPage} from '../principal/principal';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  providers: [UserService],
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  constructor( public nav: NavController, public userService: UserService, platform: Platform, public events: Events) {

    this.events.subscribe('user:login', () => {
      if( this.userService.isLoggedIn() )
        this.nav.setRoot(PrincipalPage)
    });

  }

  startLogin(){
    this.userService.login()
  }

}
