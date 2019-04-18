import { Component } from '@angular/core';

@Component({
    selector: 'patient-list',
    templateUrl: './patient-list.component.html'
  })
  export class PatientListComponent {

      onPatientDelete(patientItem){}
      onPatientEdit(patientItem){}
      onPatientShowReport(patientItem){}

      patientItems=[
            {
            p_id:1,
            p_name:"kakashi hatake",
            p_dob:"21/12/1991",
            p_bloodGroup:"O+",
            p_sex:"m"

            },{
            p_id:2,
            p_name:"naruto uzumaki",
            p_dob:"1/11/1995",
            p_bloodGroup:"A+",
            p_sex:"m"

            },{
            p_id:3,
            p_name:"sasuke uchiha",
            p_dob:"13/07/1997",
            p_bloodGroup:"B-",
            p_sex:"m"

            }


]




  }
  