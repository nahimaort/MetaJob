import { Component, OnInit } from '@angular/core';
import { getUserDataByUid, userLogin } from 'src/app/services/firebase.service';
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

  constructor(private toastController: ToastController, private navCtrl: NavController, private localStorage: LocalStorage) { }

  ngOnInit() {
  }

  async login() {
    try {
      const userId = await userLogin(this.email, this.password);

      getUserDataByUid(userId).then(userDetails =>{
        this.localStorage.setItem('userDetails', userDetails);
      })

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
    const toast = await this.toastController.create({
      message: 'You signed succesfully',
      duration: 3000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
    this.navCtrl.navigateForward('/job-offers')
  }
}
