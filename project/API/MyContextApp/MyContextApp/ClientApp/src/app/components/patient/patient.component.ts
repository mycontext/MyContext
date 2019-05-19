import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html'
})
export class PatientComponent {
  public forecasts: PatientDto[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<PatientDto[]>(baseUrl + 'api/patient').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

