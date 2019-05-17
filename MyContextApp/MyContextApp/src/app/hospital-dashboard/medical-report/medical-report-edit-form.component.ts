import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MedicalReportService} from './medical-report.service';
import {ActivatedRoute, ActivationEnd} from '@angular/router';
import { ToastrService} from 'ngx-toastr';

@Component({
    selector: 'mr-edit-form',
    templateUrl: './medical-report-edit-form.component.html'
  })
  export class MedicalReportEditFormComponent {

    form;


    constructor(private formBuilder : FormBuilder, 
        private meidcalReportService: MedicalReportService,
        private route: ActivatedRoute,
        private toastr: ToastrService){}

        reportItem;
    ngOnInit(){

        this.route.paramMap.subscribe(params=>{
            const reportId=+params.get('reportid');
            if(reportId){
                this.getReport(reportId);

                this.form=this.formBuilder.group({
                    p_id: this.formBuilder.control(this.reportItem.p_id),
                    mr_id: this.formBuilder.control(this.reportItem.mr_id),
                    mr_date: this.formBuilder.control(this.reportItem.mr_date),
                    mr_type: this.formBuilder.control(this.reportItem.mr_type),
                    mr_diagnosis: this.formBuilder.control(this.reportItem.mr_diagnosis)
        
                });

            }
            
        });
    }

    getReport(reportId: number){
        this.reportItem=this.meidcalReportService.getOneMedicalReport(reportId);
    }

    onSubmit(reportItem){
        if(this.meidcalReportService.edit(reportItem)){
            this.showSuccess(reportItem);
        }
        
    }
    showSuccess(reportItem) {

        this.toastr.success( 'Report ID : '+reportItem.mr_id,'Medical Report Edited!',{
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });
      }

  }