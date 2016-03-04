import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

/*
  Generated class for the Component component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'component',
  templateUrl: 'build/components/component/component.html',
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})
export class Component {
  constructor() {
    this.text = 'Hello World';
  }
}
