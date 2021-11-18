import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Movie } from '../models/movie.module'
import { MovieApi } from '../models/movie-api.module.ts.module'
import { ThrowStmt } from '@angular/compiler'

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  getHeader() {
    return { Authorization: 'Bearer ' + localStorage.getItem('token') }
  }

  getMyList(order: string, page: number): Observable<Movie[]> {
    const header = this.getHeader()
    return this.httpClient.get<Movie[]>('http://localhost:8081/movie-list?sort=' + order + '&page=' + page, {
      headers: header,
    })
  }

  getListByUser(userEmail: string, order: string, page: number): Observable<Movie[]> {
    const header = this.getHeader()
    return this.httpClient.get<Movie[]>(
      'http://localhost:8081/movie-list/user?username=' + userEmail + '&sort=' + order + '&page=' + page,
      {
        headers: header,
      }
    )
  }

  searchMovie(titleQuery: string, page: number): Observable<MovieApi[]> {
    const header = this.getHeader()
    return this.httpClient.get<MovieApi[]>('http://localhost:8081/movies?page=' + (page + 1) + titleQuery, {
      headers: header,
    })
  }

  getMoviePosterPath(id: string) {
    return this.httpClient.get<any>(`http://api.themoviedb.org/3/movie/${id}/images?api_key=a14d836ba9872e3582094edabf7ff1b0`)
  }

  getMoviePoster(path: string) {
    return this.httpClient.get<any>(`http://image.tmdb.org/t/p/w500${path}`)
  }

  addMovie(movieId: string | undefined): Observable<Movie> {
    const header = this.getHeader()
    return this.httpClient.post<Movie>(
      'http://localhost:8081/movie-list',
      { id: movieId },
      {
        headers: header,
      }
    )
  }

  removeMovie(movieId: string | undefined): Observable<Movie> {
    const header = this.getHeader()
    return this.httpClient.delete<Movie>('http://localhost:8081/movie-list/', {
      headers: header,
      body: {
        id: movieId,
      },
    })
  }

  editRating(movieId: string | undefined, rating: number): Observable<Movie> {
    const header = this.getHeader()
    return this.httpClient.patch<Movie>(
      'http://localhost:8081/movie-list/vote',
      {
        movieId: movieId,
        vote: rating,
      },
      { headers: header }
    )
  }
}
