import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  name: string;
  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            this.name = firebase.auth().currentUser.email.replace('.', '');
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            this.name = firebase.auth().currentUser.email.replace('.', '');
            console.log(this.name);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getUser() {
    return this.name;
  }

  setUser(user: string) {
    if (user.localeCompare(this.name))
      return;
    this.name = user;
    console.log('user set');
  }
  
  signOutUser() {
    firebase.auth().signOut();
  }
}