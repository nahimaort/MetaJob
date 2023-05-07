import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.page.html',
  styleUrls: ['./apply-job.page.scss'],
})
export class ApplyJobPage implements OnInit {
  fullname: any;
  link: any;
  cv: any;
  coverletter: any;

  constructor() { }

  ngOnInit() {
  }

}
