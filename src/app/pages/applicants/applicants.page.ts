import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { JobApplication } from 'src/app/models/JobApplication';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.page.html',
  styleUrls: ['./applicants.page.scss'],
})
export class ApplicantsPage implements OnInit {
  jobKey: any;
  jobApplications: any[] = [];
  profileImages: Map<number, string> = new Map();
  imageLoaded = false;


  constructor(private router: Router, private firebaseService: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.jobKey = params['jobKey'];
    });
  }

  ionViewDidEnter(){
    this.getAllJobOffers();
  }


  getAllJobOffers() {
    this.firebaseService.getJobApplicationsByJobOfferId(this.jobKey).then(jobApplications => {
      this.jobApplications = jobApplications;
      console.log(this.jobApplications);
      this.jobApplications.forEach((jobApplication, index) => {
        this.getProfileImage(index, jobApplication.applicant.datApplicant.profileImage);
      });
      this.imageLoaded = true;
    }).catch((error => {
      console.error(error);
    }));
  
  }
  

  getProfileImage(index: number, profileImage: string) {
    this.firebaseService.getImage(profileImage).then(profileImage => {
      this.profileImages.set(index, profileImage);
    })
  }
  
  goToApplication(jobApplication: any) {

    const applicationJson = JSON.stringify(jobApplication);
    this.router.navigate(['/application'],{queryParams: { application: applicationJson}});
  }

}
