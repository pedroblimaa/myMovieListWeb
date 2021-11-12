import { MovieApi } from './../../models/movie-api.module.ts.module'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Movie } from '../../models/movie.module'
import { MovieService } from '../../services/movie.service'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  faPlusCircle = faPlusCircle
  faMinusCircle = faMinusCircle

  movies: Movie[] = []
  moviesApi: MovieApi[] = []
  dataContent: any = {}
  loading: boolean = true
  type: string = ''
  page: number = 0
  pageTotal: boolean = true
  modalData: any = {
    visible: false,
    movieId: 0,
    add: false,
  }
  modalInfo: any = {
    visible: false,
    message: '',
    type: ''
  }


  constructor(private service: MovieService) {}

  @Output() emitor = new EventEmitter<any>()

  @Input() set movieData(model: any) {
    this.movies = model.movies
    this.dataContent = model.dataContent
    this.loading = model.loading
    this.type = model.type
    this.pageTotal = model.pageTotal ?? true
  }

  objectIsEmpty(dataContent: any) {
    return Object.keys(dataContent).length === 0
  }

  nextPage() {
    this.emitor.emit({ next: true })
    this.page++
  }

  previousPage() {
    this.emitor.emit({ next: false })
    this.page--
  }

  addMovie(movieId: string | undefined) {
    this.service.addMovie(movieId).subscribe({
      next: (data: any) => {
        console.log('adicionado com sucesso')
        console.log(data)
      },
      error: (err: any) => {
        console.log(err)
      },
    })
  }

  openModal(data: any) {
    this.modalData.visible = true
    this.modalData.movieId = data.movieId
    this.modalData.add = data.add
  }

  modalEvent(doAction: any) {
    this.modalData.visible = false
    if (doAction) {
      this.modalData.add ? this.addMovie(this.modalData.movieId) : this.removeMovie(this.modalData.movieId)
    }
  }

  removeMovie(movieId: string | undefined) {
    this.service.removeMovie(movieId).subscribe({
      next: (data: any) => {
        console.log('removido com sucesso')
        this.movies = this.movies.filter((movie) => movie.id !== movieId)
      },
      error: (err: any) => {
        console.log(err)
      },
    })
  }
}
