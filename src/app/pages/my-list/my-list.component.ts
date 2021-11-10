import { MovieService } from './../../services/movie.service'
import { MovieListComponent } from './../../components/movie-list/movie-list.component'
import { Component, OnInit, ViewChild } from '@angular/core'
import { Movie } from 'src/app/models/movie.module'

@Component({
  selector: 'app-my-list',
  templateUrl: '../my-list/my-list.component.html',
  styleUrls: ['../my-list/my-list.component.scss'],
})
export class MyListComponent implements OnInit {
  movies: Movie[] = []
  dataContent: any = {}
  loading: boolean = true

  constructor(private service: MovieService) {}

  orderBy(order: any) {
    this.loading = true

    this.service.getMyList(order).subscribe({
      next: (data) => {
        this.dataContent = data
        this.movies = this.dataContent.content
        this.loading = false
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  ngOnInit(): void {
    this.service.getMyList('release_date,asc').subscribe({
      next: (data) => {
        this.dataContent = data
        this.movies = this.dataContent.content
        this.loading = false
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
