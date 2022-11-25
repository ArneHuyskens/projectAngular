import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { AppService } from '../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  histkey = 'searchHist';

  movies: any[] = [];
  searchControl = new FormControl();
  val: any;
  message = '';
  Done = true;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(newValue => {
        this.Done = false;
        this.val = newValue;

        this.refresh();
      }
      );
  }

  refresh() {
    this.appService.getMovies(this.val).subscribe(data => {
      if (data.Response !== 'False') {
        const items = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            items.push(data[key]);
          }
        }
        this.message = `Showing results for ${this.val}`;
        this.movies = items[0];
        this.Done = true;
      } else {
        this.Done = true;
        this.movies.length = null;
        if (this.val === '') {
          this.message = `Cannot search for nothing`;
        } else {
          this.message = `No movies found related to: ${this.val}!`;
        }
      }
    })
  }

  gotoDetails(dat) {
    try {
      let history = JSON.parse(localStorage.getItem(this.histkey))
      history.splice(0, 0, dat);
      history = history.slice(0, 5);

      localStorage.setItem(this.histkey, JSON.stringify(history));
    } catch (e) {
      localStorage.setItem(this.histkey, JSON.stringify([dat]));

      console.log(e)
    }

    this.router.navigate(['/details', dat.imdbID]);
  }

}
