import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {

  cvImg: any = './assets/images/PDF.png';
  dataAplication: any;
  isPdfViewerVisible = false;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const plainData = params['application'];
      this.dataAplication = JSON.parse(plainData);
      console.log(this.dataAplication)
    });

  }


  showPdfViewer() {
    this.isPdfViewerVisible = true;
  }
}
