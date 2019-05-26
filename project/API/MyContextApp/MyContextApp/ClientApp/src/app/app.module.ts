import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component'; 
import { BuyerComponent } from './components/buyer/buyer.component';
import { AssetComponent } from './components/asset/asset.component';
import { RecorderComponent } from './components/recorder/recorder.component'; 
import { PatientService } from './services/patient.services';
import { AddPatientComponent } from './components/patient/add/add-patient.component';
import { PatientComponent } from './components/patient/list/patient.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PatientComponent,
    AddPatientComponent,
    BuyerComponent,
    AssetComponent,
    RecorderComponent, 
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      {
        path: 'patient', component: PatientComponent,
        
      },
      {
        path: 'patient/add', component: AddPatientComponent,

      }
      ,
      { path: 'buyer', component: BuyerComponent },
      { path: 'recorder', component: RecorderComponent },
      { path: 'asset', component: AssetComponent },
    ])
  ],
  providers: [
    PatientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
