import { Component } from '@angular/core';

@Component({
    selector: 'report-list',
    templateUrl: './medical-report-list.component.html'
  })
  export class MedicalReportListComponent {

      onReportDelete(reportItem){}
      onReportEdit(reportItem){}

      reportItems=[
            {
                p_id:1,
                mr_id:101,
                mr_date:"2/4/2019",
                mr_type:"RBC",
                mr_diagnosis:"Excellent"

            },
            {
                p_id:1,
                mr_id:110,
                mr_date:"1/8/2019",
                mr_type:"WBC",
                mr_diagnosis:"Ver Bad"

            },
            {
                p_id:2,
                mr_id:150,
                mr_date:"3/3/2019",
                mr_type:"X-RAY",
                mr_diagnosis:"Normal"

            },
            {
                p_id:3,
                mr_id:150,
                mr_date:"3/3/2019",
                mr_type:"Mammogram",
                mr_diagnosis:"Excellent"
    
            },
            {
                p_id:3,
                mr_id:150,
                mr_date:"3/3/2019",
                mr_type:"Ultra sound",
                mr_diagnosis:"Bad"

            },
            {
                p_id:3,
                mr_id:150,
                mr_date:"3/3/2019",
                mr_type:"Biospy",
                mr_diagnosis:"Good"
    
            }


]




  }
  