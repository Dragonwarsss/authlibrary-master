import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { BooksService } from './books.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  userName: string;
  userTmp: string;
  constructor(private router: Router,
              private authService: AuthService,
              private booksService: BooksService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              this.userName = firebase.auth().currentUser.email.replace('.', '');
              if (this.userName.localeCompare(this.userTmp)) {
                this.userTmp = this.userName;
                console.log('Setting user with ' + this.userName);
                this.booksService.setUser(this.userName);
                this.booksService.getBooks();
                console.log('Called get Books from AuthGuardService');
              }
              console.log('auth state changed: ' + 'Connected as ' + this.userName);
              this.authService.setUser(this.userName);
              this.booksService.setUser(this.userName);
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}