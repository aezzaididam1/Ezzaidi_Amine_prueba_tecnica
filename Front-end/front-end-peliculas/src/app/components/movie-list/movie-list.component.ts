import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

interface Movie {
  imdbID: string;
  title: string;
  year: string;
  plot: string;
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  filterTitle: string = '';
  filterYear: string = '';

  displayedColumns: string[] = ['imdbID', 'title', 'year', 'plot']; // Define las columnas que quiero mostrar

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
    });
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.filterTitle.toLowerCase()) &&
      movie.year.includes(this.filterYear)
    );
  }
}
