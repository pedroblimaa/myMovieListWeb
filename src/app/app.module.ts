import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './pages/login/login.component'
import { HttpClientModule } from '@angular/common/http'
import { HomeComponent } from './pages/home/home.component'
import { MyListComponent } from './pages/my-list/my-list.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MovieListComponent } from './components/movie-list/movie-list.component'
import { LoaderComponent } from './components/loader/loader.component'
import { AnotherListComponent } from './pages/another-list/another-list.component'
import { AddMovieComponent } from './pages/add-movie/add-movie.component'
import { ModalComponent } from './components/modal/modal.component'
import { InfoModalComponent } from './components/loader/info-modal/info-modal.component'
import { ModalInfoComponent } from './components/modal-info/modal-info.component'
import { ProfileComponent } from './pages/profile/profile.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MyListComponent,
    MovieListComponent,
    LoaderComponent,
    AnotherListComponent,
    AddMovieComponent,
    ModalComponent,
    InfoModalComponent,
    ModalInfoComponent,
    ProfileComponent,
    MovieDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
