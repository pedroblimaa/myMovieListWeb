import { AuthService } from '../../services/auth.service'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
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
        console.log(data)
        this.authService.setToken(data.token)
        this.authService.redirectIfAuthenticated()
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = 'Wrong email or password'
      },
    })
  }

  ngOnInit() {
    //redirect to home if already logged in
    this.authService.redirectIfAuthenticated()
  }
}
