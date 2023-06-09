import { Component, Input, OnInit } from '@angular/core';
import { JobOffer } from '../../models/JobOffer';
import { FirebaseService } from '../../services/firebase.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-offers-card',
  templateUrl: './job-offers-card.component.html',
  styleUrls: ['./job-offers-card.component.scss'],
})
export class JobOffersCardComponent implements OnInit {
  @Input() jobOffer: JobOffer = {} as JobOffer
  @Input() color: string | undefined;
  @Input() company: boolean | undefined;
  jobOfferImage: any;
  imageLoaded = false;

  constructor(private navCtrl: NavController, private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.firebaseService.getImage(this.jobOffer.imageCompany).then(res =>{
      this.jobOfferImage = res;
      this.imageLoaded = true;
    })
  }

  getPostedDays() {
    const today = new Date();
    const postedDate = new Date(this.jobOffer.date);
    const timeDiff = today.getTime() - postedDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (daysDiff <= 0) {
      return "Posted today";
    }
    return `Posted ${daysDiff} days ago`;
  }

  navigateToDetails() {
    if (this.company) {
      this.router.navigate(['applicants'],{queryParams: { jobKey: this.jobOffer.key}});
    }
    else {
      this.navCtrl.navigateForward('/job-details', { state: { jobOffer: this.jobOffer, color: this.color } });
    }
  }

}
