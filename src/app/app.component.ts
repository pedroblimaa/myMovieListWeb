import { Component, OnInit } from '@angular/core'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'myMovieListWeb'

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.testAuth().subscribe({
      next: () => { console.log('test auth ok') },
      error: (err: any) => {
        if (err.status === 403) {
          this.authService.logout()
        }
      },
    })
  }

  isLogged() {
    return this.authService.isAuthenticated()
  }

  logout() {
    this.authService.logout()
  }
}
