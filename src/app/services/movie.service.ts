import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Movie } from '../models/movie.module'
import { MovieApi } from '../models/movie-api.module.ts.module'

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  headers: any = { Authorization: 'Bearer ' + localStorage.getItem('token') }

  constructor(private httpClient: HttpClient) {}

  getMyList(order: string, page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('http://localhost:8081/movie-list?sort=' + order + '&page=' + page, {
      headers: this.headers,
    })
  }

  getListByUser(userId: string, order: string, page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      'http://localhost:8081/movie-list/user?id=' + userId + '&sort=' + order + '&page=' + page,
      {
        headers: this.headers,
      }
    )
  }

  searchMovie(titleQuery: string, page: number): Observable<MovieApi[]> {
    return this.httpClient.get<MovieApi[]>('http://localhost:8081/movies?page=' + (page + 1) + titleQuery, {
      headers: this.headers,
    })
  }

  addMovie(movieId: string | undefined): Observable<Movie> {
    return this.httpClient.post<Movie>(
      'http://localhost:8081/movie-list',
      { id: movieId },
      {
        headers: this.headers,
      }
    )
  }

  removeMovie(movieId: string | undefined): Observable<Movie> {
    return this.httpClient.delete<Movie>('http://localhost:8081/movie-list/', {
      headers: this.headers,
      body: {
        id: movieId,
      },
    })
  }

  editRating(movieId: string | undefined, rating: number): Observable<Movie> {
    return this.httpClient.patch<Movie>('http://localhost:8081/movie-list/vote', {
      movieId: movieId,
      vote: rating,
    }, {headers: this.headers})
  }
}
