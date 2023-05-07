import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddJobPage } from './add-job.page';

const routes: Routes = [
  {
    path: '',
    component: AddJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddJobPageRoutingModule {}
