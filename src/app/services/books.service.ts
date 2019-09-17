import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from '../models/book.model';
import * as firebase from '@firebase/database';
import 'firebase/database';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class BooksService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  user: string;
  strerr: string;

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    console.log('book saved on ' + this.user);
    firebase.database().ref('/books/' + this.user + '/').set(this.books);
  }

  getBooks() {
    console.log('getting books from user: ' + this.user);
    if (!this.user) {
      console.log('no User to getBooks, exit');
      return;
    }
    firebase.database().ref('/books/' + this.user + '/')
    .on('value', (data: DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
  }

  getSingleBook(id: number) {
    if (!firebase.auth.name)
    return;
    this.strerr = '/books/' + this.user + '/' + id;
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(this.strerr).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if (!this.user) {
      this.user = firebase.auth().currentUser.email.replace('.', '');
      return;
    }
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

  getUser() {
    if (!this.user)
      this.user = firebase.auth().currentUser.email.replace('.', '');
    return this.user;
  }

  setUser(name: string) {
    console.log('setUser getting ' + name);
    this.user = name;
    console.log('User set ' + this.user + ' from BooksService');
  }

  constructor() {
    this.getBooks();
  }

}