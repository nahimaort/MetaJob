import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/models/JobOffer';
import { getJobOffers } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.page.html',
  styleUrls: ['./job-offers.page.scss'],
})
export class JobOffersPage implements OnInit {
  profileImg: string = '../assets/images/profile-pic.jpeg';
  filters: string[] = ['All', 'Remote', 'Applied', 'Freshers', 'Full-time', 'Part-time'];
  colors = ['#5424FD', '#F5001E', '#FFAC35'];
  selectedFilter: any;
  allJobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  jobOffers: JobOffer[] =  [];


  constructor() {}


  ngOnInit() {
    this.selectedFilter = this.filters[0];
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
        });
      }
    }).catch((error => {
      console.error(error);
    }));
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


}
