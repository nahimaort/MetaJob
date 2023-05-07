import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }*/
  {
   path: '', redirectTo: 'onboarding', pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'job-offers',
    loadChildren: () => import('./pages/job-offers/job-offers.module').then( m => m.JobOffersPageModule)
  },
  {
    path: 'job-details',
    loadChildren: () => import('./pages/job-details/job-details.module').then( m => m.JobDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'company-job-offers',
    loadChildren: () => import('./pages/company-job-offers/company-job-offers.module').then( m => m.CompanyJobOffersPageModule)
  },
  {
    path: 'apply-job',
    loadChildren: () => import('./pages/apply-job/apply-job.module').then( m => m.ApplyJobPageModule)
  },
  {
    path: 'add-job',
    loadChildren: () => import('./pages/add-job/add-job.module').then( m => m.AddJobPageModule)
  },
  {
    path: 'applicants',
    loadChildren: () => import('./pages/applicants/applicants.module').then( m => m.ApplicantsPageModule)
  },
  {
    path: 'application',
    loadChildren: () => import('./pages/application/application.module').then( m => m.ApplicationPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
