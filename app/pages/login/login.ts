import {Platform} from 'ionic-angular';
import {Page, NavController} from 'ionic-angular';
import {UserService} from "../../providers/user-service/user-service";
import {PrincipalPage} from '../principal/principal';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  providers: [UserService],
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  constructor( public nav: NavController, public userService: UserService, platform: Platform) {

  }

  startFacebookLogin(){
    this.userService.login().then( (result) => {
      this.nav.push(PrincipalPage, {});
    })
    .catch( (errorMessage) => console.log(errorMessage) );
  }

}
