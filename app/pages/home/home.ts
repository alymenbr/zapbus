import {Page} from 'ionic-angular';
import {IonicApp, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  messagesRef: Firebase; // Initialized Firebase object
  firebaseUrl: string;
  isLoggedIn: boolean;   // Was authentification sucesfull
  authData: any;         // Object that holds Twitter authentification data (displayName, imageURL, etc.)

  authDataProfileName: string;        // Profile name
  authDataProfileImage: string;       // Profile image

  constructor() {
    console.log('=========================');
    console.log( Firebase );
      this.firebaseUrl = "https://zapbus.firebaseio.com/";
      this.messagesRef = new Firebase(this.firebaseUrl);
      this.messagesRef.onAuth((user) => {
          if (user) {
              this.authData = user;

              this.authDataProfileImage  = this.authData.twitter.profileImageURL.replace(/\_normal/,"");
              this.authDataProfileName = this.authData.twitter.displayName;

              this.isLoggedIn = true;
          }
      });
  }

  authWithFacebook() {
      this.messagesRef.authWithOAuthPopup("facebook", (error) => {
          if (error) {
              console.log(error);
          }
      }, {remember: "sessionOnly"});
  }

  unauthWithFacebook() {
      this.messagesRef.unauth();
      this.isLoggedIn = false;
  }

}
