import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Movie } from '../models/movie.module'

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  headers: any = { Authorization: 'Bearer ' + localStorage.getItem('token') }

  constructor(private httpClient: HttpClient) {}

  getMyList(order: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('http://localhost:8081/movie-list?sort=' + order, {
      headers: this.headers,
    })
  }

  getListByUser(userId: string, order: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('http://localhost:8081/movie-list/user?id=' + userId + '&sort=' + order, {
      headers: this.headers,
    })
  }
}
