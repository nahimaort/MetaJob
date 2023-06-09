import {Component, Input, OnInit} from '@angular/core';
import {JobOffer} from "../../models/JobOffer";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  jobOffer: JobOffer = {} as JobOffer
  userDetails: any;
  color: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.jobOffer = this.router.getCurrentNavigation()?.extras.state?.['jobOffer'];
        this.color = this.router.getCurrentNavigation()?.extras.state?.['color'];
      }
    });
  }

  goToApplyJob() {
    this.router.navigate(['apply-job'],{queryParams: { jobKey: this.jobOffer.key}});
  }
}
