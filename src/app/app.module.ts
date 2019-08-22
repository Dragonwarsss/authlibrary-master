import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { MapComponent } from './map/map.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuardService], component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent },
  { path: 'search', canActivate: [AuthGuardService], component: SearchBarComponent },
  { path: 'map', component: MapComponent},
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbbkT7BgFryO6kAS3xOcuZXMppy7KwbmE'
    }),
  ],
  declarations: [ AppComponent, HelloComponent, SignupComponent, SigninComponent, BookListComponent, SingleBookComponent, BookFormComponent, HeaderComponent, SearchBarComponent, FileSizePipe, MapComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AuthService, BooksService, AuthGuardService],
})
export class AppModule { }
