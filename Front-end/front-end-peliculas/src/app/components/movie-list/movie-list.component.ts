import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';

interface Movie {
  imdbID: string;
  title: string;
  year: string;
  plot: string;
  rating?: number; 
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

  displayedColumns: string[] = ['imdbID', 'title', 'year', 'plot', 'rating'];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(
      movies => {
        this.movies = movies;
        this.filteredMovies = movies;
      },
      error => {
        console.error('Error al obtener películas:', error);
        alert("error al obtener las peliculas, comprobar base de datos");
      }
    );
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.filterTitle.toLowerCase()) &&
      movie.year.includes(this.filterYear)
    );
  }

  updateRating(imdbID: string, rating: number): void {
    if (rating < 1 || rating > 10) { // Comprobación para que solo se pueda introuducir puntuación en el rango deseado
      alert('La puntuación debe estar entre 1 y 10');
      this.getMovies();
      return;
    }
    this.movieService.updateMovieRating(imdbID, rating).subscribe(
      response => {
        console.log('Puntuación actualizada correctamente:', response);
        alert("La puntuación de la pelicula con ID: " + imdbID +" ha sido establecida a: " + rating);
        // Actualizar la lista de películas después de actualizar la puntuación
        this.getMovies();
      },
      error => {
        console.error('Error al actualizar la puntuación:', error);
        alert("error al actualizar la puntuación")
      }
    );
  }


  fetchMovies(): void {
    this.movieService.fetchMovies().subscribe(
      movies => {
        console.log('Películas obtenidas de OMDb:', movies);
        this.movies = movies;
        this.getMovies();
      },
      error => {
        console.error('Error al obtener películas desde OMDb:', error);
        alert("Error al obtener películas desde OMDb:")
      }
    );
  }
}
