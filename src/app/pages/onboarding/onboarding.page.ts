import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  logoImg: string =  "../assets/images/logo.png";
  onboardingImg: string =  "../assets/images/onboarding-image.png";

  constructor(public router: Router) { }

  ngOnInit() {
    this.logoImg = "../assets/images/logo.png";
    this.onboardingImg = "../assets/images/onboarding-image.png";
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}
