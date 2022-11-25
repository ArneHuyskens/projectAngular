import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  movies: any;
  movie: any;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/dbMovies').subscribe(dat => {
      this.movies = dat;
      console.warn(dat)
    })
   }

  ngOnInit(): void {
  }

  removeMovie(id: string) {
    console.warn('http://localhost:3000/dbMovies/' + id)
    this.http.delete('http://localhost:3000/dbMovies/' + id)
  }

  toWatched(movie: any) {
    this.http.put('http://localhost:3000/dbMovies/' + movie.id, {
      Title: movie.Title, 
      Poster: movie.Poster, 
      Year: movie.Year, 
      inWatched: true, 
      inWatchList: true,
      Rating: movie.Rating,
      Reaction: movie.Reaction
    }).subscribe()
    window.location.href = '/watched';
  }

}
