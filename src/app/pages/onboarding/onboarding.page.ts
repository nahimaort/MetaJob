import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  logoImg: string =  "../assets/images/logo.png";
  onboardingImg: string =  "../assets/images/onboarding-image.png";

  constructor() { }

  ngOnInit() {
    this.logoImg = "../assets/images/logo.png";
    this.onboardingImg = "../assets/images/onboarding-image.png";
  }

}
