import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyJobOffersPageRoutingModule } from './company-job-offers-routing.module';

import { CompanyJobOffersPage } from './company-job-offers.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyJobOffersPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CompanyJobOffersPage]
})
export class CompanyJobOffersPageModule {}
