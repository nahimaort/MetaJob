import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApplicationPageRoutingModule } from './application-routing.module';
import { ApplicationPage } from './application.page';
import { NgxExtendedPdfViewerModule  } from 'ngx-extended-pdf-viewer';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPageRoutingModule,
    NgxExtendedPdfViewerModule
    
  ],
  declarations: [ApplicationPage]
})
export class ApplicationPageModule {}
