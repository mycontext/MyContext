import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list.component';
import { PatientComponent } from './patient.component';
import { MedicalReportListComponent } from './medical-report-list.component';
import { MedicalReportComponent } from './medical-report.component';
import { MedicalReportAddFormComponent } from './medical-report-add-form.component';
import { MedicalReportEditFormComponent } from './medical-report-edit-form.component';
import {PatientService} from './patient.service';
import {MedicalReportService} from './medical-report.service';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientComponent,
    MedicalReportComponent,
    MedicalReportListComponent,
    MedicalReportAddFormComponent,
    MedicalReportEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PatientService,
    MedicalReportService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
