import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.page.html',
  styleUrls: ['./job-offers.page.scss'],
})
export class JobOffersPage implements OnInit {
  profileImg: string = '../assets/images/profile-pic.jpeg';
  filters: string[] = ['All', 'Remote', 'Applied', 'Freshers', 'Fulltime', 'Partime'];
  selectedFilter: any;

  constructor() { }

  ngOnInit() {
    this.selectedFilter = this.filters[0];
  }

}
