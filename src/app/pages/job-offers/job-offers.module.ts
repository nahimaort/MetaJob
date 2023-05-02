import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobOffersPageRoutingModule } from './job-offers-routing.module';

import { JobOffersPage } from './job-offers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobOffersPageRoutingModule
  ],
  declarations: [JobOffersPage]
})
export class JobOffersPageModule {}
