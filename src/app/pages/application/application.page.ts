import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {
  private websiteUrl: string = 'https://ionicframework.com/docs/api/fab';
  cvImg: any = './assets/images/PDF.png';

  constructor() { }

  ngOnInit() {
  }

  openWebsite() {
    window.open(this.websiteUrl, '_blank');
  }
}
