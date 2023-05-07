import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyJobOffersPage } from './company-job-offers.page';

describe('CompanyJobOffersPage', () => {
  let component: CompanyJobOffersPage;
  let fixture: ComponentFixture<CompanyJobOffersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompanyJobOffersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
