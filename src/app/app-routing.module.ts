import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
{ path: '', component: SearchComponent },
{ path: 'search', component: SearchComponent },
{ path: 'details/:value', component: DetailsComponent },
{ path: 'watchlist', component: WatchlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
