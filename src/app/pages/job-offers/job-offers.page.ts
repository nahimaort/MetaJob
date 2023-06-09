import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { JobOffer } from 'src/app/models/JobOffer';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorage } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.page.html',
  styleUrls: ['./job-offers.page.scss'],
})
export class JobOffersPage implements OnInit {
  profileImg: string = '';
  filters: string[] = ['All','Full-time', 'Part-time', 'Internship', 'Freshers', 'Contract', 'Temporary', 'Volunteer'];
  colors = ['#5424FD', '#F5001E', '#FFAC35'];
  selectedFilter: any;
  allJobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  jobOffers: JobOffer[] =  [];
  userDetails: any;

  constructor(private localStorage: LocalStorage, private firebaseService: FirebaseService, private navCtrl: NavController) {}


  ngOnInit() {
    this.selectedFilter = this.filters[0];
    this.userDetails = this.localStorage.getItem('userDetails')
    this.getAllJobOffers();
    this.getProfileImage()
  }


  onFilterSelected(filter: string){
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
  }

  getAllJobOffers(){
    this.firebaseService.getJobOffers().then(jobOffers => {

      this.allJobOffers = Object.values(jobOffers);
      this.jobOffers = this.allJobOffers.slice();
      
    }).catch((error => {
      console.error(error);
    }));
    
  }

  getProfileImage(){
    this.firebaseService.getImage(this.userDetails.profileImage).then(profileImage => {
      this.profileImg = profileImage
    })
  }

  logout(){
    this.localStorage.removeItem('userDetails');
    this.localStorage.removeItem('userId');
    this.firebaseService.logout();
    this.navCtrl.navigateForward('/onboarding')
  }
}
