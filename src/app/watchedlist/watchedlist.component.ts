import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-watchedlist',
  templateUrl: './watchedlist.component.html',
  styleUrls: ['./watchedlist.component.css']
})
export class WatchedlistComponent implements OnInit {

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

  removeMovieFromWatched(movie: any) {
    this.http.get('http://localhost:3000/dbMovies/' + movie.id).subscribe((dat) => {
      this.movie = dat
    });
    this.http.put('http://localhost:3000/dbMovies/' + movie.id, {
      Title: movie.Title, 
      Poster: movie.Poster, 
      Year: movie.Year, 
      inWatched: false, 
      inWatchList: true,
      Rating: null,
      Reaction: null
    }).subscribe()
    window.location.reload();
  }
}
