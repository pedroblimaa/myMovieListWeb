import { Router } from '@angular/router';
import { MovieService } from './../../services/movie.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { Movie } from 'src/app/models/movie.module'

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss'],
})
export class MyListComponent implements OnInit {
  movies: Movie[] = []
  dataContent: any = {}
  loading: boolean = true
  errorMessage: string = ''
  page: number = 0
  order: string = 'release_date,asc'

  constructor(private service: MovieService, private route: Router) {
    const data = this.route.getCurrentNavigation()?.extras.state
    if (data) {
      this.page = data['page']
      this.order = data['order']
      this.getMovies()
    }
  }

  changePage(event: { next: any }) {
    this.page = event.next ? this.page + 1 : this.page - 1
    this.getMovies()
  }

  getMovies(order: any = 'release_date,asc') {
    this.order = order
    this.loading = true

    this.service.getMyList(order, this.page).subscribe({
      next: (data) => {
        this.setMovies(data)
        this.loading = false
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = 'User not found'
        }

        console.log(err)
      },
    })
  }

  ngOnInit(): void {
    this.getMovies()
  }

  setMovies(data: any) {
    this.dataContent = data
    this.movies = this.dataContent.content
    this.loading = false
  }
}
