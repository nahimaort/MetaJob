import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { JobOffer } from 'src/app/models/JobOffer';
import { getImage, FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorage } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-company-job-offers',
  templateUrl: './company-job-offers.page.html',
  styleUrls: ['./company-job-offers.page.scss'],
})
export class CompanyJobOffersPage implements OnInit {

  profileImg: string = '';
  filters: string[] = ['All', 'Remote', 'Applied', 'Freshers', 'Full-time', 'Part-time'];
  colors = ['#5424FD', '#F5001E', '#FFAC35'];
  selectedFilter: any;
  allJobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  companyJobOffers: JobOffer[] =  [];
  userDetails: any;
  userId: any;

  constructor(private localStorage: LocalStorage, private navCtrl: NavController, private firebaseService: FirebaseService) {}


  ngOnInit() {
    this.selectedFilter = this.filters[0];
    this.userId = this.localStorage.getItem('userId')
    this.userDetails = this.localStorage.getItem('userDetails')
    this.getProfileImage()
  }

  ionViewWillEnter(){
    this.getAllJobOffers();
  }


  /*onFilterSelected(filter: string){
    this.selectedFilter = filter

    if (filter === 'All') {
      this.jobOffers = this.allJobOffers.slice();

    } else {
      this.filteredJobOffers.splice(0, this.filteredJobOffers.length);

      this.allJobOffers.filter(jobOffer => {
        if(jobOffer.jobType === this.selectedFilter)
          this.filteredJobOffers.push(jobOffer);
      });
      this.jobOffers = this.filteredJobOffers.slice();
    }
  }*/

  getAllJobOffers(){
    console.log(this.userId)
    this.firebaseService.getJobOffersByCompany(this.userId).then( jobOffers =>{
      this.companyJobOffers = Object.values(jobOffers);

    }).catch((error => {
      console.error(error);
    }));
  }

  getProfileImage(){
    getImage(this.userDetails.profileImage).then(profileImage => {
      this.profileImg = profileImage
    })
  }

  addJobOffer(){
    this.navCtrl.navigateForward('/add-job');
  }

}
