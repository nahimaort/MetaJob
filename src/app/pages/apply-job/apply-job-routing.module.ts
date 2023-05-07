import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyJobPage } from './apply-job.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyJobPageRoutingModule {}
