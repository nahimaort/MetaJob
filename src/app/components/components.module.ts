import { NgModule } from "@angular/core";
import { JobOffersCardComponent } from "./job-offers-card/job-offers-card.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [JobOffersCardComponent],
    exports: [JobOffersCardComponent],
    imports: [IonicModule, CommonModule, FormsModule]
})
export class ComponentsModule{}