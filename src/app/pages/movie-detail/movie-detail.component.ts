import { MovieService } from './../../services/movie.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: MovieService) {}
  movie: any = {}
  imageUrl: string = ''
  loading: any = true

  ngOnInit() {
    this.movie = this.route.snapshot.params
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
