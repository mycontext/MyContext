import {Injectable} from '@angular/core';

//@Injectable()
export class MedicalReportService{



get(){

    return this.reportItems;
    
}

getOnePatientReport(patientId:number){
    let foundReport=[];

    for(let i=0;i<this.reportItems.length;i++){
        
        if(this.reportItems[i].p_id==patientId){
            
            foundReport.push(this.reportItems[i]);
        }
    }
    return foundReport;
    
}

getOneMedicalReport(reportId:number){
    for(let i=0;i<this.reportItems.length;i++){
        
        if(this.reportItems[i].mr_id==reportId){
            
            return this.reportItems[i];
        }
    }
    return null;
    
}

add(reportItem){
    this.reportItems.push(reportItem);
    return true;
}

edit(reportItem){
    for(let i=0;i<this.reportItems.length;i++){
        if(reportItem.mr_id==this.reportItems[i].mr_id){
            this.reportItems[i].p_id=reportItem.p_id;
            this.reportItems[i].mr_date=reportItem.mr_date;
            this.reportItems[i].mr_type=reportItem.mr_type;
            this.reportItems[i].mr_diagnosis=reportItem.mr_diagnosis;
        }
        console.log('success');

    }
    return true;
}

delete(reportItem){
    let index = this.reportItems.indexOf(reportItem);
    if(index>=0){
        this.reportItems.splice(index,1);
    }
    return true;
}

reportItems=[
            {
                p_id:7789,
                mr_id:900128,
                mr_date:"2/4/2019",
                mr_type:"RBC",
                mr_diagnosis:"Normal"

            },
            {
                p_id:7789,
                mr_id:900658,
                mr_date:"1/8/2019",
                mr_type:"WBC",
                mr_diagnosis:"Very Bad"

            },
            {
                p_id:7877,
                mr_id:900777,
                mr_date:"3/3/2019",
                mr_type:"X-RAY",
                mr_diagnosis:"Normal"

            },
            {
                p_id:7999,
                mr_id:908784,
                mr_date:"3/3/2019",
                mr_type:"MAMMOGRAM",
                mr_diagnosis:"Normal"
    
            },
            {
                p_id:7999,
                mr_id:904835,
                mr_date:"3/3/2019",
                mr_type:"ULTRASOUND",
                mr_diagnosis:"Bad"

            },
            {
                p_id:7999,
                mr_id:912486,
                mr_date:"3/3/2019",
                mr_type:"RBC",
                mr_diagnosis:"Good"
    
            }


            ]
}

interface ReportItem{
    p_id:number;
    mr_id:number;
    mr_date:string;
    mr_type:string;
    mr_diagnosis:string;

}

interface ReportItemResponse{
    reportItems: ReportItem[];
}