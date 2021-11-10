import { MovieService } from '../../services/movie.service'
import { Component, OnInit } from '@angular/core'
import { Movie } from '../../models/movie.module'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = []

  constructor(private service: MovieService) {}

  ngOnInit(): void {
  }
}
