import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ReviewComponent } from './review/review.component';
import { WatchedlistComponent } from './watchedlist/watchedlist.component';

const routes: Routes = [
{ path: '', component: SearchComponent },
{ path: 'search', component: SearchComponent },
{ path: 'details/:value', component: DetailsComponent },
{ path: 'watchlist', component: WatchlistComponent},
{ path: 'review/:value', component: ReviewComponent},
{ path: 'watchedlist', component: WatchedlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
