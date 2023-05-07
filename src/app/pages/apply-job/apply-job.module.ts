import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyJobPageRoutingModule } from './apply-job-routing.module';

import { ApplyJobPage } from './apply-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyJobPageRoutingModule
  ],
  declarations: [ApplyJobPage]
})
export class ApplyJobPageModule {}
