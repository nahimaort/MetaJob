import { Component, Input, OnInit } from '@angular/core';
import { JobOffer } from '../../models/JobOffer';
import { getJobOfferImage } from '../../services/firebase.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-job-offers-card',
  templateUrl: './job-offers-card.component.html',
  styleUrls: ['./job-offers-card.component.scss'],
})
export class JobOffersCardComponent implements OnInit {
  @Input() jobOffer: JobOffer = {} as JobOffer
  @Input() color: string | undefined;
  jobOfferImage: any;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    getJobOfferImage(this.jobOffer.imageCompany).then(res =>{
      this.jobOfferImage = res;
    })
  }

  navigateToDetails() {
    this.navCtrl.navigateForward('/job-details', { state: { jobOffer: this.jobOffer } });
  }

}
