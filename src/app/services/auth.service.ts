import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticate(formLogin: any) {
    return this.httpClient.post<any>('http://localhost:8081/auth', formLogin)
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    this.redirectIfNotAuthenticated()
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  redirectIfNotAuthenticated() {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login'])
    }
  }

  redirectIfAuthenticated() {
    if (this.isAuthenticated()) {
      this.router.navigate(['/'])
    }
  }
}
