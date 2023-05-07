import {Component, Input, OnInit} from '@angular/core';
import {JobOffer} from "../../models/JobOffer";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-job-offers-short-card',
  templateUrl: './job-offers-short-card.component.html',
  styleUrls: ['./job-offers-short-card.component.scss'],
})
export class JobOffersShortCardComponent  implements OnInit {
  @Input() jobOffer: JobOffer = {} as JobOffer
  @Input() color: string | undefined;
  jobOfferImage: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getImage(this.jobOffer.imageCompany).then(res =>{
      this.jobOfferImage = res;
    })
  }
}
