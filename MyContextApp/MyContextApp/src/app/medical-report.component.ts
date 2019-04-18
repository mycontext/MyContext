import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[m-report]',
    templateUrl: './medical-report.component.html'
  })
  export class MedicalReportComponent {
    @Input() reportItem;
    
    @Output() edit= new EventEmitter();
    @Output() delete=new EventEmitter();



    onEdit(){
        this.edit.emit(this.reportItem);

    }

    onDelete(){
        this.delete.emit(this.reportItem);
    }


  
  }
  