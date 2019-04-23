import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MedicalReportService} from './medical-report.service';
import {ActivatedRoute, ActivationEnd} from '@angular/router';

@Component({
    selector: 'mr-edit-form',
    templateUrl: './medical-report-edit-form.component.html'
  })
  export class MedicalReportEditFormComponent {

    form;


    constructor(private formBuilder : FormBuilder, 
        private meidcalReportService: MedicalReportService,
        private route: ActivatedRoute){}


    ngOnInit(){

        this.form=this.formBuilder.group({
            p_id: this.formBuilder.control(''),
            mr_id: this.formBuilder.control(''),
            mr_date: this.formBuilder.control(''),
            mr_type: this.formBuilder.control(''),
            mr_diagnosis: this.formBuilder.control('')

        });

        this.route.paramMap.subscribe(params=>{
            const reportId=+params.get('reportId');
            if(reportId){
                this.getReport(reportId);
            }
        });
    }

    getReport(reportId: number){
        //this.meidcalReportService.getReport(reportId).subscribe((reportItem));
    }

    onSubmit(reportItem){
        this.meidcalReportService.edit(reportItem);
    }


  }