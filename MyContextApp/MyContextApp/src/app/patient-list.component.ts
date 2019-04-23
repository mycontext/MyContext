import { Component } from '@angular/core';



import {PatientService} from './patient.service';

@Component({
    selector: 'patient-list',
    templateUrl: './patient-list.component.html'
  })
  export class PatientListComponent {

      patientItems;

      constructor(private patientServices: PatientService){}
      
      ngOnInit(){
        this.patientItems=this.patientServices.get();
      }


      onPatientDelete(patientItem){
        this.patientServices.delete(patientItem);

      }
      onPatientEdit(patientItem){}
      onPatientShowReport(patientItem){}

      



  }
  