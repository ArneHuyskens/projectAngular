import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Form, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  formbuilder: FormBuilder;
  val: string;
  dat: any;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private formBuilder: FormBuilder) { }


    movieReview: any;
    movieRating: any;
    reviewForm = this.formBuilder.group({
      Rating: 0,
      Review: ''
    })

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.val = params.get('value');
      this.refresh();
    });
  }

  reviewMovie() {
    this.http.get('http://localhost:3000/dbMovies/' + this.val).subscribe((dat) => {
      this.dat = dat
    });
    this.http.put('http://localhost:3000/dbMovies/' + this.val, {
      Title: this.dat.Title,
      Poster: this.dat.Poster,
      Year: this.dat.Year,
      inWatchList: true,
      inWatched: true,
      Rating: this.movieRating,
      Reaction: this.movieReview
    }).subscribe((dat) => {
      console.warn(dat);
    })
    window.location.href = '/watchedlist';
  }

  refresh() {
    this.http.get('http://localhost:3000/dbMovies/' + this.val).subscribe((dat) => {
      this.dat = dat
    });
  }

}
