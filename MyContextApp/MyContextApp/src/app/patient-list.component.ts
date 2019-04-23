import { Component } from '@angular/core';


import {MedicalReportService} from './medical-report.service'
import {PatientService} from './patient.service';

@Component({
    selector: 'patient-list',
    templateUrl: './patient-list.component.html'
  })
  export class PatientListComponent {

      patientItems;

      constructor(private patientServices: PatientService,
        private medicalReportService: MedicalReportService){}
      
      ngOnInit(){
        this.patientItems=this.patientServices.get();
      }


      onPatientDelete(patientItem){
        this.patientServices.delete(patientItem);

      }
      onPatientEdit(patientItem){}

      onPatientShowReport(patientItem){
        this.medicalReportService.getOnePatientReport(patientItem.p_id);
      }

      



  }
  