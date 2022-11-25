import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  movies: any;
  movie: any;

  constructor(private http: HttpClient, private router: Router) {
    this.http.get('http://localhost:3000/dbMovies').subscribe(dat => {
      this.movies = dat;
      console.warn(dat)
    })
   }

  ngOnInit(): void {
  }

  removeMovie(id: string) {
    console.warn('http://localhost:3000/dbMovies/' + id)
    this.http.delete('http://localhost:3000/dbMovies/' + id).subscribe()
    window.location.reload();
  }

  toWatched(movie: any) {
    this.http.get('http://localhost:3000/dbMovies/' + movie.id).subscribe((dat) => {
      this.movie = dat
    });
    this.http.put('http://localhost:3000/dbMovies/' + movie.id, {
      Title: movie.Title, 
      Poster: movie.Poster, 
      Year: movie.Year, 
      inWatched: true, 
      inWatchList: true,
      Rating: movie.Rating,
      Reaction: movie.Reaction
    }).subscribe()
    this.router.navigate(['/review', movie.id]);
  }

}
