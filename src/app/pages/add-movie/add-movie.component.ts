import { MovieService } from './../../services/movie.service'
import { Component, OnInit } from '@angular/core'
import { MovieApi } from 'src/app/models/movie-api.module.ts.module'
import { Movie } from 'src/app/models/movie.module'

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent {
  movieName: string = ''

  dataContent: any = {}
  moviesApi: MovieApi[] = []
  movies: Movie[] = []
  loading: boolean = false
  page: number = 0

  constructor(private service: MovieService) {}

  changePage(event: any) {
    this.page = event.next ? this.page + 1 : this.page - 1
    console.log('Going to page: ' + this.page)
    this.searchMovies()
  }

  searchMovies() {
    this.loading = true

    let movieQuery = ''

    if (this.movieName.length > 0) {
      movieQuery = '&name=' + this.movieName
    }

    this.service.searchMovie(movieQuery, this.page).subscribe({
      next: (data) => {
        this.moviesApi = data
        this.movies = this.moviesApi.map((movie) => {
          return {
            id: movie.id,
            name: movie.title,
            release_date: movie.release_date,
            language: movie.original_language,
            vote_average: movie.vote_average,
          }
        })

        console.log(data)
        this.dataContent = {
          pageable: {
            pageNumber: this.page,
          },
        }

        this.loading = false
        this.dataContent.totalPages = this.movies.length
        this.dataContent.empty = this.movies.length === 0 ? true : false
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
