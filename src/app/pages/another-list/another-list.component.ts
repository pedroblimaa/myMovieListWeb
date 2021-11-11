import { MovieService } from './../../services/movie.service'
import { Component, OnInit } from '@angular/core'
import { Movie } from 'src/app/models/movie.module'

@Component({
  selector: 'app-another-list',
  templateUrl: './another-list.component.html',
  styleUrls: ['./another-list.component.scss'],
})
export class AnotherListComponent {
  movies: Movie[] = []
  dataContent: any = {}
  loading: boolean = false
  userId: string = ''
  errorMessage: string = ''

  constructor(private service: MovieService) {}

  searchUserList(order: any = 'release_date,asc'): void {
    this.loading = true

    this.service.getListByUser(this.userId, order).subscribe({
      next: (data) => {
        this.errorMessage = ''
        this.setMovies(data)
      },
      error: (err) => {
        console.log(err)
        if (err.status === 404) {
          this.errorMessage = 'User not found'
        }
      },
    })
  }

  setMovies(data: any) {
    this.dataContent = data
    this.movies = this.dataContent.content
    this.loading = false
  }
}
