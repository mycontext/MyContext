import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Popup} from 'ng2-opd-popup';
import { ToastrService} from 'ngx-toastr';

import {MedicalReportService} from './medical-report.service';

@Component({
    selector: 'report-list',
    templateUrl: './medical-report-list.component.html'
  })
  export class MedicalReportListComponent {
    currentReportItem;
    reportItems;
    @ViewChild('popup1') popup1: Popup;
    

    constructor(private medicalReportService: MedicalReportService,
      private route: ActivatedRoute,private toastr: ToastrService){

      }

      

    ngOnInit(){
      
      this.route.paramMap.subscribe(params=>{
        const p_id=params.get('patientid');
        if(p_id){
                    
          this.getReport(p_id);
        }
        else{
          this.reportItems=this.medicalReportService.get();
        }
      });

    }

    getReport(patientId){
      
      this.reportItems=this.medicalReportService.getOnePatientReport(patientId);

    }


    onReportDelete(reportItem){
      this.currentReportItem=reportItem;
      this.popup1.options = {
        header: "DELETE",
        color: "#d9534f", // red, blue....
        widthProsentage: 20, // The with of the popou measured by browser width
        animationDuration: .05, // in seconds, 0 = no animation
        showButtons: true, // You can hide this in case you want to use custom buttons
        confirmBtnContent: "DELETE", // The text on your confirm button
        cancleBtnContent: "Cancel", // the text on your cancel button
        confirmBtnClass: "btn btn-default", // your class for styling the confirm button
        cancleBtnClass: "btn btn-default", // you class for styling the cancel button
        animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
      this.popup1.show(this.popup1.options);
      //this.medicalReportService.delete(reportItem);
    }
    onReportEdit(reportItem){}

    YourConfirmEvent(){
      if(this.medicalReportService.delete(this.currentReportItem)){
        this.showSuccess(this.currentReportItem);
      }
      this.popup1.hide();
    }
     
    YourCancelEvent(){
      //alert('You cliked cancel');
    }

    showSuccess(reportItem) {

      this.toastr.error( 'Report ID : '+reportItem.mr_id,'Medical Report DELETED!',{
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
    }
    
  }
  