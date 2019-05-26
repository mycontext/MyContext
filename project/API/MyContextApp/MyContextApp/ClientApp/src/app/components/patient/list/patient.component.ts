import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { PatientDto } from '../../../models/patient-dto';
import { PatientService } from '../../../services/patient.services';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit{
  public patientList: PatientDto[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _service: PatientService) {
   
  }
  ngOnInit() {
   this._service.findAll().subscribe(result => {
      this.patientList = result;
    }, error => console.error(error));
  }


}

