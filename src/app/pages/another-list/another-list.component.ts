import { Router } from '@angular/router';
import { MovieService } from './../../services/movie.service'
import { Component } from '@angular/core'
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
  userEmail: string = ''
  errorMessage: string = ''
  page: number = 0
  order: string = 'release_date,asc'

  constructor(private service: MovieService, private route: Router) {
    const data = this.route.getCurrentNavigation()?.extras.state
    if (data) {
      this.userEmail = data['username']
      this.page = data['page']
      this.order = data['order']
      this.searchUserList()
    }
  }

  changePage(event: { next: any }){

    this.page = event.next ? this.page + 1 : this.page - 1
    this.searchUserList()
  }

  searchUserList(order: string = this.order): void {
    this.order = order
    this.loading = true

    this.service.getListByUser(this.userEmail, order, this.page).subscribe({
      next: (data) => {
        this.errorMessage = ''
        this.setMovies(data)
      },
      error: (err) => {
        console.log(err)
        if (err.status === 404) {
          this.errorMessage = 'User not found'
        }
        if(err.status === 403){
          this.errorMessage = 'The list is private'
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
