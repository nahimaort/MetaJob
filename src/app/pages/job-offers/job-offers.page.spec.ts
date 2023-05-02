import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobOffersPage } from './job-offers.page';

describe('JobOffersPage', () => {
  let component: JobOffersPage;
  let fixture: ComponentFixture<JobOffersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JobOffersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
