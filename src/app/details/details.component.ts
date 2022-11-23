import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  val: string;
  dat: any;

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.val = params.get('value');
      this.refresh();
    });
  }

  refresh() {
    this.appService.getDetails(this.val).subscribe(dat => {
      this.dat = dat;
    })
  }
}
