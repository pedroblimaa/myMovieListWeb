import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/Login/Login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, MyListComponent, MovieListComponent, LoaderComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
