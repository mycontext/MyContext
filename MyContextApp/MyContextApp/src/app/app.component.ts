import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyContextApp';

  onPatientDelete(patientItem){}
  onPatientEdit(patientItem){}
  onPatientShowReport(patientItem){}

  firstPatientItem={
    p_id:1,
    p_name:"kakashi hatake",
    p_dob:"21/12/1991",
    p_bloodGroup:"O+",
    p_sex:"m"



  };

}
