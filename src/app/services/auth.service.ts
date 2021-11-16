import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  getHeader() {
    return { Authorization: 'Bearer ' + localStorage.getItem('token') }
  }

  authenticate(formLogin: any) {
    return this.httpClient.post<any>('http://localhost:8081/auth', formLogin)
  }

  getUser(): any {
    return this.httpClient.get<any>('http://localhost:8081/user', {
      headers: this.getHeader(),
    })
  }

  setPrivateList(privateList: any) {
    localStorage.setItem('privateList', JSON.stringify(privateList))
    return this.httpClient.patch<any>(
      'http://localhost:8081/movie-list/private-list',
      { privateList: privateList },
      {
        headers: this.getHeader(),
      }
    )
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
