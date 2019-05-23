import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { PatientDto } from '../../../models/patient-dto';
import { PatientService } from '../../../services/patient.services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './add-patient.component.html'
})
export class AddPatientComponent  implements OnInit{
 patientForm:FormGroup

 constructor(private formBuilder: FormBuilder,
   private _service: PatientService,
   private router:Router) {
     
  }
 ngOnInit() {
   console.log("tst");
    this.patientForm = this.formBuilder.group({
      
      userId: '',    
      email: '',
      password: '',
      cPassword: ''
      });
 }
 save() {
   this._service.save(this.patientForm.value).subscribe(
     res => {
       this.router.navigate(['']);
     },
     error => {
       console.log(error);
     }
   );
  }
}

