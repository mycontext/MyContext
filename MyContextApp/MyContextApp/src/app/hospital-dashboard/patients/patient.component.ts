import { Component, Input, Output, EventEmitter } from '@angular/core';

import {Router } from '@angular/router';

@Component({
    selector: '[patient]',
    templateUrl: './patient.component.html'
  })
  export class PatientComponent {

    constructor(private _router:Router){}

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

    onShowReport(patientId: number){
      this._router.navigate(['/reportlist',patientId]);

  }
  
  }
  