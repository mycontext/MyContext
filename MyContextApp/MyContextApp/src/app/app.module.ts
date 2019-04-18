import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list.component';
import { PatientComponent } from './patient.component';
import { MedicalReportListComponent } from './medical-report-list.component';
import { MedicalReportComponent } from './medical-report.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientComponent,
    MedicalReportComponent,
    MedicalReportListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
