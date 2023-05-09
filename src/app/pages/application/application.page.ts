import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {

  cvImg: any = './assets/images/PDF.png';
  dataAplication: any;
  isPdfViewerVisible = false;
  pdfPreview: string = './assets/images/pdfPreview.jpg'
  
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private toastController: ToastController, private navController: NavController) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const plainData = params['application'];
      this.dataAplication = JSON.parse(plainData);
    });

  }

  showPdf() {
    this.isPdfViewerVisible =! this.isPdfViewerVisible;
  }

  async rejectJobApplication() {

    try {
        await this.firebaseService.deleteJobApplication(this.dataAplication.jobOfferId, this.dataAplication.userId);
        const toast = await this.toastController.create({
          message: 'You have rejected the application',
          duration: 3000,
          position: 'bottom',
          color: 'success'
        });
  
        toast.present();
        this.navController.back();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'An error occurred during the rejection. Please try again later.',
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
      this.navController.back();
    }
}
}
