import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobOffersPageRoutingModule } from './job-offers-routing.module';

import { JobOffersPage } from './job-offers.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobOffersPageRoutingModule,
    ComponentsModule
  ],
  declarations: [JobOffersPage]
})
export class JobOffersPageModule {}
