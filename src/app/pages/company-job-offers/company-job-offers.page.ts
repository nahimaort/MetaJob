import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { JobOffer } from 'src/app/models/JobOffer';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorage } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-company-job-offers',
  templateUrl: './company-job-offers.page.html',
  styleUrls: ['./company-job-offers.page.scss'],
})
export class CompanyJobOffersPage implements OnInit {

  profileImg: string = '';
  colors = ['#5424FD', '#F5001E', '#FFAC35'];
  allJobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  companyJobOffers: JobOffer[] =  [];
  userDetails: any;
  userId: any;

  constructor(private localStorage: LocalStorage, private navCtrl: NavController, private firebaseService: FirebaseService) {}


  ngOnInit() {
    this.userId = this.localStorage.getItem('userId')
    this.userDetails = this.localStorage.getItem('userDetails')
    this.getProfileImage()
  }

  ionViewWillEnter(){
    this.getCompanyJobOffers();
  }

  getCompanyJobOffers(){
    this.firebaseService.getJobOffersByCompany(this.userId).then( jobOffers =>{
      this.companyJobOffers = Object.values(jobOffers);

    }).catch((error => {
      console.error(error);
    }));
  }

  getProfileImage(){
    this.firebaseService.getImage(this.userDetails.profileImage).then(profileImage => {
      this.profileImg = profileImage
    })
  }

  addJobOffer(){
    this.navCtrl.navigateForward('/add-job');
  }

  logout(){
    this.localStorage.removeItem('userDetails');
    this.localStorage.removeItem('userId');
    this.firebaseService.logout();
    this.navCtrl.navigateForward('/onboarding')
  }

}
