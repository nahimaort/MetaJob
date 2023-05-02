import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobOffersPage } from './job-offers.page';

const routes: Routes = [
  {
    path: '',
    component: JobOffersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOffersPageRoutingModule {}
