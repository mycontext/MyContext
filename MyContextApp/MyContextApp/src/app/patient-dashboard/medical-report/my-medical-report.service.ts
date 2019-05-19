import {Injectable} from '@angular/core';

//@Injectable()
export class MyMedicalReportService{


get(){

    return this.reportItems;
    
}


reportItems=[
            {
                h_id:23465,
                h_name:"Olivia Newton-John Cancer Wellness & Research Centre",
                mr_id:900128,
                mr_date:"2/4/2019",
                mr_type:"RBC",
                mr_diagnosis:"Normal"

            },
            {
                h_id:23465,
                h_name:"Olivia Newton-John Cancer Wellness & Research Centre",
                mr_id:900658,
                mr_date:"1/8/2019",
                mr_type:"WBC",
                mr_diagnosis:"Very Bad"

            },
            {
                h_id:29987,
                h_name:"Peter MacCallum Cancer Centre",
                mr_id:900777,
                mr_date:"3/3/2019",
                mr_type:"X-RAY",
                mr_diagnosis:"Normal"

            },
            {
                h_id:30025,
                h_name:"Moorabbin Hospital",
                mr_id:900898,
                mr_date:"3/3/2019",
                mr_type:"MAMMOGRAM",
                mr_diagnosis:"Normal"
    
            },
            {
                h_id:30025,
                h_name:"Moorabbin Hospital",
                mr_id:900778,
                mr_date:"3/3/2019",
                mr_type:"ULTRASOUND",
                mr_diagnosis:"Bad"

            },
            {
                h_id:30025,
                h_name:"Moorabbin Hospital",
                mr_id:900132,
                mr_date:"3/3/2019",
                mr_type:"RBC",
                mr_diagnosis:"Good"
    
            }


            ]
}

interface ReportItem{
    h_id:number;
    h_name:string;
    mr_id:number;
    mr_date:string;
    mr_type:string;
    mr_diagnosis:string;

}

interface ReportItemResponse{
    reportItems: ReportItem[];
}