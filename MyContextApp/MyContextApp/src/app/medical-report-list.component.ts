import { Component } from '@angular/core';

@Component({
    selector: 'report-list',
    templateUrl: './medical-report-list.component.html'
  })
  export class MedicalReportListComponent {

      onReportDelete(reportItem){}
      onReportEdit(reportItem){}

      patientItems=[
            {
            mr_id:1,
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
  