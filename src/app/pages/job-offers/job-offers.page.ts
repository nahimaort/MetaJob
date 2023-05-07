import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/models/JobOffer';
import { getJobOffers, getImage } from 'src/app/services/firebase.service';
import { LocalStorage } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.page.html',
  styleUrls: ['./job-offers.page.scss'],
})
export class JobOffersPage implements OnInit {
  profileImg: string = '';
  filters: string[] = ['All', 'Remote', 'Applied', 'Freshers', 'Full-time', 'Part-time'];
  colors = ['#5424FD', '#F5001E', '#FFAC35'];
  selectedFilter: any;
  allJobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  jobOffers: JobOffer[] =  [];
  userDetails: any;

  constructor(private localStorage: LocalStorage) {}


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
    getJobOffers().then(res => {
      if (res.exists()) {
        const data = res.val() as JobOffer;
        const jobOffersArray = Object.values(data);
    
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

        this.jobOffers = this.allJobOffers.slice();
        });
      }
    }).catch((error => {
      console.error(error);
    }));
    
  }

  getProfileImage(){
    getImage(this.userDetails.profileImage).then(profileImage => {
      this.profileImg = profileImage
    })
  }
}
