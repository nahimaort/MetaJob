import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplyJobPage } from './apply-job.page';

describe('ApplyJobPage', () => {
  let component: ApplyJobPage;
  let fixture: ComponentFixture<ApplyJobPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApplyJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
