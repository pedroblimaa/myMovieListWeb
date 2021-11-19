import { MovieService } from './../../services/movie.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  constructor(private service: MovieService, private route: Router) {}
  detailData: any = {}
  movie: any = {}
  imageUrl: string = ''
  loading: any = true
  pageData: any = {}
  faArrowCircleLeft = faArrowCircleLeft

  return() {
    this.route.navigate([this.detailData.pageUrl], {
      state: {
        movieName: this.pageData.movieName,
        username: this.pageData.username,
        page: this.pageData.page,
        order: this.pageData.order,
      },
    })
  }

  ngOnInit() {
    this.detailData = JSON.parse(localStorage.getItem('detailData') || '{}')
    this.movie = this.detailData.movie
    this.pageData = this.detailData.pageData
    this.service.getMoviePosterPath(this.movie.id).subscribe({
      next: (data) => {
        if (data.posters.length > 0) {
          this.imageUrl = 'http://image.tmdb.org/t/p/w500' + data.posters[0].file_path
        }
        this.loading = false
      },
      error: (err) => {
        console.log(err)
        this.loading = false
      },
    })
  }
}
