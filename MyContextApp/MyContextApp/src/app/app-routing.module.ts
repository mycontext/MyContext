import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MedicalReportAddFormComponent} from './hospital-dashboard/medical-report/medical-report-add-form.component';
import {MedicalReportEditFormComponent} from './hospital-dashboard/medical-report/medical-report-edit-form.component';
import {PatientListComponent} from './hospital-dashboard/patients/patient-list.component';
import {MedicalReportListComponent} from './hospital-dashboard/medical-report/medical-report-list.component';
import { MyMedicalReportComponent } from './patient-dashboard/medical-report/my-medical-reports.component';
import { MyRequestComponent } from './patient-dashboard/requests/my-request.component';
import { MyProfileComponent } from './patient-dashboard/profile/my-profile.component';

const routes: Routes = [
  {path: 'addreport', component: MedicalReportAddFormComponent},
  {path: 'editreport/:reportid', component: MedicalReportEditFormComponent},
  {path: 'patientlist', component: PatientListComponent},
  {path: 'reportlist', component: MedicalReportListComponent},
  {path: 'reportlist/:patientid', component: MedicalReportListComponent},
  {path: 'myreportlist', component: MyMedicalReportComponent},
  {path: 'patientdashboard', pathMatch: 'full', redirectTo: 'myreportlist'},
  {path: 'myrequest', component: MyRequestComponent},
  {path: 'myprofile', component: MyProfileComponent},
  {path: 'hospitaldashboard', pathMatch: 'full', redirectTo: 'reportlist'},
  {path: '', pathMatch: 'full', redirectTo: 'reportlist'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
