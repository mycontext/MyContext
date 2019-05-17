import {Injectable} from '@angular/core';

//@Injectable()
export class RequestService{


get(){

    return this.requestItems;
    
}


requestItems=[
            {
                buyer_id:10079,
                buyer_name:"Commonwealth Scientific and Industrial Research Organization",
                request_date:"19/4/2019",
                mr_id:900128,
                duration:"6 months",
                price:1000.00
    
            },
            {
                buyer_id:10058,
                buyer_name:"Bureau of Meteorology",
                request_date:"21/2/2019",
                mr_id:900777,
                duration:"2 years",
                price:5000.00

            },
            {
                buyer_id:10015,
                buyer_name:"Royal Children's Hospital",
                request_date:"2/1/2019",
                mr_id:9000898,
                duration:"10 years",
                price:10100.00
    
            }


            ]
}

interface RequestItem{
    buyer_id:number;
    buyer_name:string;
    request_date:string;
    mr_id:number;
    duration:string;
    price:number;

}

interface RequestItemResponse{
    requestItems: RequestItem[];
}