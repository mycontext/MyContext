import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { PatientComponent } from "./patient/patient.component";
import { HospitalComponent } from "./hospital/hospital.component";
import { BuyerComponent } from "./buyer/buyer.component";
import { CreateReportComponent } from "./create-report/create-report.component";
import { EditReportComponent } from "./edit-report/edit-report.component";
import { ViewReportComponent } from "./view-report/view-report.component";
import { DeleteReportComponent } from "./delete-report/delete-report.component";

  const routes: Routes = [
    { 
      path: "",
      component: LoginComponent
    },
    { path: "signup", component: SignupComponent },
    { path: "home", component: HomeComponent },
    { path: "patient", component: PatientComponent },
    { path: "hospital", component: HospitalComponent },
    { path: "buyer", component: BuyerComponent },
    { path: "create", component: CreateReportComponent },
    { path: "update", component: EditReportComponent },
    { path: "view", component: ViewReportComponent },
    { path: "delete", component: DeleteReportComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
