import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MedicalReportAddFormComponent} from './medical-report-add-form.component';
import {MedicalReportEditFormComponent} from './medical-report-edit-form.component';
import {PatientListComponent} from './patient-list.component';
import {MedicalReportListComponent} from './medical-report-list.component';


const routes: Routes = [
  {path: 'addreport', component: MedicalReportAddFormComponent},
  {path: 'editreport/:reportid', component: MedicalReportEditFormComponent},
  {path: 'patientlist', component: PatientListComponent},
  {path: 'reportlist', component: MedicalReportListComponent},
  {path: 'reportlist/:patientid', component: MedicalReportListComponent},
  {path: '', pathMatch: 'full', redirectTo: 'reportlist'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
