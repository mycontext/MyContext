import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';


import {MedicalReportService} from './medical-report.service';

@Component({
    selector: 'report-list',
    templateUrl: './medical-report-list.component.html'
  })
  export class MedicalReportListComponent {

    reportItems;

    constructor(private medicalReportService: MedicalReportService,
      private activatedRoute: ActivatedRoute){}

    ngOnInit(){
      this.reportItems=this.medicalReportService.get('');
      //  this.activatedRoute.params.subscribe(params =>{
      //    let p_id=params['p_id'];
      //    if(p_id.toLowerCase()==='all'){
      //      p_id='';
      //      console.log('all it is');
      //    }
      //    this.reportItems=this.medicalReportService.get(p_id);
      //  });
    }

    onReportDelete(reportItem){
        this.medicalReportService.delete(reportItem);
    }
    onReportEdit(reportItem){}

    
  }
  