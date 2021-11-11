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

  constructor(private service: MovieService) {}

  getMovies(order: any = 'release_date,asc') {
    this.service.getMyList(order).subscribe({
      next: (data) => {
        this.setMovies(data)
      },
      error: (err) => {

        if(err.status === 404) {
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
