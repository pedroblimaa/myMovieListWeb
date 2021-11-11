import { AuthService } from '../../services/auth.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = ''
  password: string = ''
  errorMessage: string = ''

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.errorMessage = ''

    const formLogin = {
      email: this.email,
      password: this.password,
    }

    this.authService.authenticate(formLogin).subscribe({
      next: (data) => {
        this.authService.setToken(data.token)
        this.authService.redirectIfAuthenticated()
      },
      error: (err) => {
        console.log(err.status)
        if (err.status === 400) {
          this.errorMessage = 'Wrong email or password'
        }
      },
    })
  }

  ngOnInit() {
    //redirect to home if already logged in
    this.authService.redirectIfAuthenticated()
  }
}
