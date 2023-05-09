import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput, IonTextarea, NavController, ToastController } from '@ionic/angular';
import { JobApplication } from 'src/app/models/JobApplication';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorage } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.page.html',
  styleUrls: ['./apply-job.page.scss'],
})
export class ApplyJobPage implements OnInit {

  @ViewChild('link') link!: IonInput;
  @ViewChild('cv') cv!: IonInput;
  @ViewChild('coverletter') coverletter!: IonTextarea;
  userDetails: any;
  userId: any;
  cvUrl: any;
  jobKey: any;
  cvImg: any = './assets/images/PDF.png';

  constructor(private localStorage: LocalStorage,
    private firebaseService: FirebaseService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserDetails();

    this.route.queryParams.subscribe(params => {
      this.jobKey = params['jobKey'];
    });
  }

  jobApplication: JobApplication = {
    datApplicant:{
      fullname: '',
      email: '',
      link: '',
      cv: '',
      coverletter: '',
      currentPosition: '',
      profileImage: ''
    },
    jobOfferId: '',
    userId: ''
    
  };

  fillJobApplicationData(){
    this.jobApplication.datApplicant.fullname = this.userDetails.name
    this.jobApplication.datApplicant.email = this.userDetails.email
    this.jobApplication.datApplicant.currentPosition = this.userDetails.currentPosition;
    this.jobApplication.datApplicant.profileImage = this.userDetails.profileImage;
    this.jobApplication.datApplicant.link = this.link.value?.toString() ?? '';
    this.jobApplication.datApplicant.coverletter = this.coverletter.value?.toString() ?? '';
    this.jobApplication.datApplicant.cv = this.cvUrl;

  }

  getUserDetails(){
    this.userDetails = this.localStorage.getItem('userDetails');
    this.userId = this.localStorage.getItem('userId');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.firebaseService.uploadCv(file, this.userId).then((downloadUrl) => {
      this.cvUrl = downloadUrl;

    }).catch((error) => {
      console.error('Error uploading CV: ', error);
    });
  }

  async applyForJob(){
    this.fillJobApplicationData();

    try {
      await this.firebaseService.addJobOApplication(this.jobKey, this.userId, this.jobApplication);
      const toast = await this.toastCtrl.create({
        message: 'Your job aplication has been sent successfully',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      });
      toast.present();

    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'An error occurred while processing the job aplication. Please try again later.',
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }

    this.navCtrl.navigateForward('/job-offers')
  }


}
