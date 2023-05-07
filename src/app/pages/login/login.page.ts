import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavController, ToastController } from '@ionic/angular';
import { LocalStorage } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string="";
  password:string=""
  logoImg: string =  "../assets/images/logo.png";

  constructor(private toastController: ToastController, private navCtrl: NavController, private localStorage: LocalStorage, private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async login() {
    try {
      const userId = await this.firebaseService.userLogin(this.email, this.password);

      const userDetails = await this.firebaseService.getUserDataByUid(userId)
        this.localStorage.setItem('userId', userId);
        this.localStorage.setItem('userDetails', userDetails);

      const toast = await this.toastController.create({
        message: 'You signed succesfully',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      });

      toast.present();
      const isCompany = this.localStorage.getItem('userDetails').isCompany

      if(isCompany == true)
        this.navCtrl.navigateForward('/company-job-offers')
      else
        this.navCtrl.navigateForward('/job-offers')

    } catch (error) {
      console.error(error);
      const toast = await this.toastController.create({
        message: 'Wrong credentials. Please try again or reset your password',
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }
}
