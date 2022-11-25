import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  val: string;
  dat: any;

  constructor(
    private route: ActivatedRoute, 
    private appService: AppService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.val = params.get('value');
      this.refresh();
    });
  }

  movieToWatchList(){
      this.http.post('http://localhost:3000/dbMovies/',{
        Title: this.dat.Title,
        Poster: this.dat.Poster,
        Year: this.dat.Year,
        inWatchList: true,
        inWatched: false,
        Rating: null,
        Reaction: null
      }).subscribe((dat) => {
        console.warn(dat);
      });
      window.location.href = '/watchlist';
  }

  refresh() {
    this.appService.getDetails(this.val).subscribe(dat => {
      this.dat = dat;
    })
  }
}
