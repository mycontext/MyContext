export class MedicalReportService{



get(p_id){
    if(p_id===''){
        return this.reportItems;
    }
    else{

    }
    
}

getReport(reportId){
    return this.onereportitem;
    
}

add(reportItem){
    this.reportItems.push(reportItem);
}

edit(reportItem){
    this.reportItems.push(reportItem);
}

delete(reportItem){
    let index = this.reportItems.indexOf(reportItem);
    if(index>=0){
        this.reportItems.splice(index,1);
    }
}

onereportitem={p_id:1,
    mr_id:101,
    mr_date:"2/4/2019",
    mr_type:"RBC",
    mr_diagnosis:"Excellent"};

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
                mr_diagnosis:"Very Bad"

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
                mr_type:"MAMMOGRAM",
                mr_diagnosis:"Excellent"
    
            },
            {
                p_id:3,
                mr_id:150,
                mr_date:"3/3/2019",
                mr_type:"ULTRASOUND",
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