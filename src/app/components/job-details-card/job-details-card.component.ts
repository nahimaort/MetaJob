import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-job-details-card',
  templateUrl: './job-details-card.component.html',
  styleUrls: ['./job-details-card.component.scss'],
})
export class JobDetailsCardComponent  implements OnInit {
  @Input() title: string | undefined;
  @Input() icon: string | undefined;
  @Input() description: string | string[] | undefined;

  constructor() { }

  ngOnInit() {}

}
