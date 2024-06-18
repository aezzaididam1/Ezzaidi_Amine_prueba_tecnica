import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Movie {
  imdbID: string;
  title: string;
  year: string;
  plot: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

   // Método para actualizar la puntuación de una película
   updateMovieRating(imdbID: string, rating: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${imdbID}/rating/${rating}`, {});
  }

  // Método para obtener películas desde la api a la base de datos
  fetchMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/fetch`);
  }

}
