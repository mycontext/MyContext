import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import {MyMedicalReportService} from './my-medical-report.service';

@Component({
    selector: 'my-report-list',
    templateUrl: './my-medical-report.component.html'
  })
  export class MyMedicalReportComponent {
    reportItems;
    reportItem;

    constructor(private medicalReportService: MyMedicalReportService,
      private route: ActivatedRoute){

      }

      

    ngOnInit(){

          this.reportItems=this.medicalReportService.get();


    }

    
  }
  