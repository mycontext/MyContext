import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MedicalReportService} from './medical-report.service';

@Component({
    selector: 'mr-add-form',
    templateUrl: './medical-report-add-form.component.html'
  })
  export class MedicalReportAddFormComponent {

    form;


    constructor(private formBuilder : FormBuilder, private meidcalReportService: MedicalReportService){}


    ngOnInit(){
        this.form=this.formBuilder.group({
            p_id: this.formBuilder.control(''),
            mr_id: this.formBuilder.control(''),
            mr_date: this.formBuilder.control(''),
            mr_type: this.formBuilder.control('RBC'),
            mr_diagnosis: this.formBuilder.control('')

        });
    }

    onSubmit(reportItem){
        this.meidcalReportService.add(reportItem);
    }


  }