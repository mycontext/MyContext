import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html'
})
export class PatientComponent {
  public patientList: PatientDto[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<PatientDto[]>(baseUrl + 'api/patient').subscribe(result => {
      this.patientList = result;
    }, error => console.error(error));
  }
}

