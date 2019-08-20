import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BooksService } from '../services/books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs/Subscription';
import { FileSizePipe } from '../pipes/file-size.pipe';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;
  title: string;
  books: Book[];
  booksSubscription: Subscription;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private booksService: BooksService) { }

  ngOnInit() {
    this.initForm();
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onViewBook(id: number) {
    console.log(this.books[id].synopsis);
  }

  toSearchArray(elem: string, sbook: Book): boolean {
    var arr = (elem + '').split(' ');                 //Search Key Array
    var arr_author = (sbook.author + '').split(' ');
    var arr_title = (sbook.title + '').split(' ');
    var num = 0;
    var tmp = false;
    if (!elem)
      return true;
    
    for (var i = 0; i != arr.length; i++) {
      for (var j = 0, tmp = false; j != arr_title.length; j++) {
        if (arr_title[j].includes(arr[i])) {
          num += 1;
          tmp = true;
        }
      }
      if (tmp == false)
        return false;
    }
    if (num > 0)
      return true;
    return false;
  }
}