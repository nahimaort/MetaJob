import { Component, Input, OnInit } from '@angular/core';
import { JobOffer } from '../../models/JobOffer';
import { getJobOfferImage } from '../../services/firebase.service';

@Component({
  selector: 'app-job-offers-card',
  templateUrl: './job-offers-card.component.html',
  styleUrls: ['./job-offers-card.component.scss'],
})
export class JobOffersCardComponent implements OnInit {
  @Input() jobOffer: JobOffer = {} as JobOffer
  jobOfferImage: any;

  constructor() { }

  ngOnInit() {
    getJobOfferImage(this.jobOffer.imageCompany).then(res =>{
      this.jobOfferImage = res;
    })
  }

}
