import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/models/JobOffer';
import { getJobOffersByCompany, getImage } from 'src/app/services/firebase.service';
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

  constructor(private localStorage: LocalStorage) {}


  ngOnInit() {
    this.selectedFilter = this.filters[0];
    this.userId = this.localStorage.getItem('userId')
    this.userDetails = this.localStorage.getItem('userDetails')
    this.getProfileImage()
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
    getJobOffersByCompany(this.userId).then(jobOffers => {

      const jobOffersArray = Object.values(jobOffers);

      jobOffersArray.forEach(jobOffer => {
        this.allJobOffers.push({
          benefits: jobOffer.benefits,
          company: jobOffer.company,
          date: jobOffer.date,
          imageCompany: jobOffer.imageCompany,
          jobType: jobOffer.jobType,
          location: jobOffer.location,
          offerDescription: jobOffer.offerDescription,
          roleDescription: jobOffer.roleDescription,
          salary: jobOffer.salary,
          skills: jobOffer.skills,
          title: jobOffer.title,
          workPlace: jobOffer.workPlace,
        } as JobOffer);
      });
      
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
    
  }

}
