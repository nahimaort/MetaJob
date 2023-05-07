import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.page.html',
  styleUrls: ['./applicants.page.scss'],
})
export class ApplicantsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToApplication() {
    this.router.navigate(['/application']);
  }
}
