import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';
import { PatientDto } from '../models/patient-dto';
import { RegisterDto } from '../models/register-dto';
 @Injectable()
export class PatientService {
  //loading: boolean = true;
  //public assetList: AssetDto[];
  //formData: AssetDto = new AssetDto();

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  findAll(): Observable<PatientDto[]> {
   return this.http.get<PatientDto[]>(this.baseUrl + 'api/patient');
  }
  save(data: RegisterDto) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return  this.http.post(this.baseUrl + 'api/patient', data, { headers: headers })
      ;
  }
}
