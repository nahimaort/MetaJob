import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobDetailsPageRoutingModule } from './job-details-routing.module';

import { JobDetailsPage } from './job-details.page';
import {JobDetailsCardComponent} from "../../components/job-details-card/job-details-card.component";
import {JobOffersShortCardComponent} from "../../components/job-offers-short-card/job-offers-short-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobDetailsPageRoutingModule
  ],
    declarations: [JobDetailsPage, JobDetailsCardComponent, JobOffersShortCardComponent]
})
export class JobDetailsPageModule {}
