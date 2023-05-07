import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddJobPage } from './add-job.page';

describe('AddJobPage', () => {
  let component: AddJobPage;
  let fixture: ComponentFixture<AddJobPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
