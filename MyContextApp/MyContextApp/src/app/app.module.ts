import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {PopupModule} from 'ng2-opd-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './hospital-dashboard/patients/patient-list.component';
import { PatientComponent } from './hospital-dashboard/patients/patient.component';
import { MedicalReportListComponent } from './hospital-dashboard/medical-report/medical-report-list.component';
import { MedicalReportComponent } from './hospital-dashboard/medical-report/medical-report.component';
import { MedicalReportAddFormComponent } from './hospital-dashboard/medical-report/medical-report-add-form.component';
import { MedicalReportEditFormComponent } from './hospital-dashboard/medical-report/medical-report-edit-form.component';
import {PatientService} from './hospital-dashboard/patients/patient.service';
import {MedicalReportService} from './hospital-dashboard/medical-report/medical-report.service';

import { MyRequestComponent } from './patient-dashboard/requests/my-request.component';
import { MyMedicalReportComponent } from './patient-dashboard/medical-report/my-medical-reports.component';
import {MyMedicalReportService} from './patient-dashboard/medical-report/my-medical-report.service';
import {RequestService} from './patient-dashboard/requests/my-request.service';


@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientComponent,
    MedicalReportComponent,
    MedicalReportListComponent,
    MedicalReportAddFormComponent,
    MedicalReportEditFormComponent,
    MyMedicalReportComponent,
    MyRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
     PopupModule.forRoot()
  ],
  providers: [
    PatientService,
    MedicalReportService,
    MyMedicalReportService,
    RequestService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
