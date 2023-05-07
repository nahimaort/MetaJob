import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonSelect, IonTextarea, NavController, ToastController } from '@ionic/angular';
import { JobOffer } from 'src/app/models/JobOffer';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorage } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.page.html',
  styleUrls: ['./add-job.page.scss'],
})
export class AddJobPage implements OnInit {
  @ViewChild('jobTitle') jobTitle!: IonInput;
  @ViewChild('salary') salary!: IonInput;
  @ViewChild('workplace') workplace!: IonSelect;
  @ViewChild('location') location!: IonInput;
  @ViewChild('jobType') jobType!: IonSelect;
  @ViewChild('description') description!: IonTextarea;
  @ViewChild('skills') skills!: IonTextarea;
  @ViewChild('role') role!: IonTextarea;

  userDetails: any;
  userId: any;

  constructor(private localStorage: LocalStorage, private firebaseService: FirebaseService, private toastController: ToastController, private navCtrl: NavController) {}

  ngOnInit() {
    this.getUserDetails();
  }

  jobOffer: JobOffer = {
    company: '',
    date: '',
    imageCompany: '',
    jobType: '',
    location: '',
    offerDescription: '',
    roleDescription: '',
    salary: '',
    skills: [],
    title: '',
    workPlace: '',
    key: ''
  };

  getDate(){
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  }

  getUserDetails(){
    this.userDetails = this.localStorage.getItem('userDetails');
    this.userId = this.localStorage.getItem('userId');
  }

  fillJobOfferData(){
    this.jobOffer.date = this.getDate();

    this.jobOffer.company = this.userDetails.name;
    this.jobOffer.imageCompany = this.userDetails.profileImage;

    this.jobOffer.title = this.jobTitle.value?.toString() ?? '';
    this.jobOffer.salary = this.salary.value?.toString() ?? '';
    this.jobOffer.location = this.location.value?.toString() ?? '';
    this.jobOffer.offerDescription = this.description.value?.toString() ?? '';
    this.jobOffer.roleDescription = this.role.value?.toString() ?? '';
    this.jobOffer.jobType = this.jobType.value;
    this.jobOffer.workPlace = this.workplace.value;
    this.jobOffer.skills = this.skills?.value?.split('\n') ?? [];
  }

  async addJobOffer() {
    this.fillJobOfferData();

    try {
      await this.firebaseService.addJobOffer(this.userId, this.jobOffer);
      const toast = await this.toastController.create({
        message: 'Offer added successfully',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      });
      toast.present();

    } catch (error) {
      const toast = await this.toastController.create({
        message: 'An error occurred while adding the offer. Please try again later.',
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }

    this.navCtrl.navigateForward('/company-job-offers')
  }

}
