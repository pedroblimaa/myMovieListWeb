import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myMovieListWeb';

  constructor(private authService: AuthService) {}

  isLogged(){
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
