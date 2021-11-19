import { ActivatedRoute, Router } from '@angular/router'
import { MovieApi } from './../../models/movie-api.module.ts.module'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Movie } from '../../models/movie.module'
import { MovieService } from '../../services/movie.service'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  faPlusCircle = faPlusCircle
  faMinusCircle = faMinusCircle
  faEdit = faEdit

  movies: Movie[] = []
  moviesApi: MovieApi[] = []
  dataContent: any = {}
  loading: boolean = true
  type: string = ''
  page: number = 0
  pageTotal: boolean = true
  movieName: string = ''
  username: string = ''
  order: string = ''
    modalData: any = {
    visible: false,
    movieId: 0,
    add: false,
    text: '',
  }
  modalEditData: any = {
    visible: false,
    movieId: 0,
  }
  modalInfo: any = {
    visible: false,
    message: '',
    type: '',
  }

  constructor(private service: MovieService, private route: Router, private actRoute: ActivatedRoute) {
    const data = this.route.getCurrentNavigation()?.extras.state
    if (data) {
      this.movieName = data['movieName']
      this.page = data['page']
      this.order = data['order']
    }
  }

  @Output() emitor = new EventEmitter<any>()

  @Input() set movieData(model: any) {
    this.movies = model.movies
    this.dataContent = model.dataContent
    this.loading = model.loading
    this.type = model.type
    this.pageTotal = model.pageTotal ?? true
    this.movieName = model.movieName ?? ''
    this.username = model.userEmail ?? ''
    this.order = model.order ?? ''
  }

  movieDetail(movie: any, event: any) {
    const data = {
      movie: movie,
      pageUrl: this.route.url,
      pageData: {
        movieName: this.movieName,
        page: this.page,
        username: this.username,
        order: this.order
      },
    }

    localStorage.setItem('detailData', JSON.stringify(data))

    if (event.ctrlKey) {
      return
    }

    this.route.navigate(['/movie'])
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
        this.setModalInfo('Added successfully ', 'success')
      },
      error: (err: any) => {
        console.log(err)
        this.setModalInfo(err.status === 400 ? 'Movie already in the list' : 'Error adding', 'error')
      },
    })
  }

  removeMovie(movieId: string | undefined) {
    this.service.removeMovie(movieId).subscribe({
      next: (data: any) => {
        this.setModalInfo('Removed successfully', 'success')
        this.movies = this.movies.filter((movie) => movie.id !== movieId)
      },
      error: (err: any) => {
        this.setModalInfo('Error removing', 'error')
        console.log(err)
      },
    })
  }

  //Modal to add or remove a movie
  openModal(data: any) {
    this.modalData.visible = true
    this.modalData.movieId = data.movieId
    this.modalData.add = data.add ?? false
    this.modalData.text = data.add ? 'Add' : 'Remove'
  }

  openEditModal(movieId: any) {
    this.modalEditData.visible = true
    this.modalEditData.movieId = movieId
  }

  modalEvent({ doAction }: any) {
    this.modalData.visible = false
    if (doAction) {
      this.modalData.add ? this.addMovie(this.modalData.movieId) : this.removeMovie(this.modalData.movieId)
    }
  }

  editRating({ rating, doAction }: any) {
    this.modalEditData.visible = false

    if (doAction === false) {
      return
    }

    this.service.editRating(this.modalEditData.movieId, rating).subscribe({
      next: (data: any) => {
        this.setModalInfo('Rating updated successfully', 'success')
        this.movies = this.movies.map((movie) =>
          movie.id == this.modalEditData.movieId ? { ...movie, vote_average: data.vote_average } : movie
        )
      },
      error: (err: any) => {
        this.setModalInfo('Error updating rating', 'error')
        console.log(err)
      },
    })
  }

  //Modal Info
  setModalInfo(message: string, type: string) {
    this.modalInfo.visible = true
    this.modalInfo.message = message
    this.modalInfo.type = type
  }
}
