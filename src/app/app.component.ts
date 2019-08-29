import { Component } from '@angular/core';
import * as firebase from 'firebase';
import * as elastic from '@elastic/elasticSearch';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  lat = 51.678418;
  lng = 7.809007;

  client;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAqL4oF6P6kVFKKN40kHm2CXARmbgVBH3c",
      authDomain: "library-8a890.firebaseapp.com",
      databaseURL: "https://library-8a890.firebaseio.com",
      projectId: "library-8a890",
      storageBucket: "library-8a890.appspot.com",
      messagingSenderId: "731019339448",
      appId: "1:731019339448:web:8fb3e7b831e0d749"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
}
