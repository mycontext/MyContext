import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { MedicalReportService} from './medical-report.service';
import { ToastrService} from 'ngx-toastr';

@Component({
    selector: 'mr-add-form',
    templateUrl: './medical-report-add-form.component.html'
  })
  export class MedicalReportAddFormComponent {

    form;



    constructor(private formBuilder : FormBuilder, 
        private meidcalReportService: MedicalReportService,
        private toastr: ToastrService){
        }


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
        
        if(this.meidcalReportService.add(reportItem)){

            this.showSuccess(reportItem);
        }
        
    }

    showSuccess(reportItem) {

        this.toastr.success( 'Report ID : '+reportItem.mr_id,'New Medical Report Added!',{
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });
      }

  }