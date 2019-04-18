import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[patient]',
    templateUrl: './patient.component.html'
  })
  export class PatientComponent {
    @Input() patientItem;
    
    @Output() edit= new EventEmitter();
    @Output() delete=new EventEmitter();
    @Output() showReport=new EventEmitter();


    onEdit(){
        this.edit.emit(this.patientItem);

    }

    onDelete(){
        this.delete.emit(this.patientItem);
    }

    onShowReport(){
      this.showReport.emit(this.patientItem);
  }
  
  }
  