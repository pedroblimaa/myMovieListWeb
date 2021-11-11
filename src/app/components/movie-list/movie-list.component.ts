import { Component, Input, OnInit } from '@angular/core'
import { Movie } from '../../models/movie.module'
import { MovieService } from '../../services/movie.service'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  movies: Movie[] = []
  dataContent: any = {}
  loading: boolean = true

  constructor(private service: MovieService) {}

  @Input() set movieData(model: any) {
    this.movies = model.movies
    this.dataContent = model.dataContent
    this.loading = model.loading
  }

  objectIsEmpty(dataContent: any){
    return Object.keys(dataContent).length === 0
  }

  previousPage() {
    //previous page
  }

  nextPage() {
    //next page
  }
}
