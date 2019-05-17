import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: '[m-report]',
    templateUrl: './medical-report.component.html'
  })
  export class MedicalReportComponent {
   
    constructor(private _router: Router){}
    
    @Input() reportItem;
    
    @Output() edit= new EventEmitter();
    @Output() delete=new EventEmitter();



    onReportEdit(reportId:number){

      this._router.navigate(['/editreport',reportId]);

        //this.edit.emit(this.reportItem);

    }

    onReportDelete(){
        
        this.delete.emit(this.reportItem);
    }


  
  }
  