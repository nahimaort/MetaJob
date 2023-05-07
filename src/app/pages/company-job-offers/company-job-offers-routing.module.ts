import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyJobOffersPage } from './company-job-offers.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyJobOffersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyJobOffersPageRoutingModule {}
