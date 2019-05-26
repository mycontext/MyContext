import {Injectable} from '@angular/core';

@Injectable()
export class PatientService{

    get(){
        return this.patientItems;
    }

    add(patientItem){
        this.patientItems.push(patientItem);
    }

    delete(patientItem){
        let index = this.patientItems.indexOf(patientItem);
        if(index >=0){
            this.patientItems.splice(index,1);
        }
    }

    patientItems=[
        {
        p_id:7789,
        p_name:"John Smith",
        p_dob:"21/12/1991",
        p_bloodGroup:"O+",
        p_sex:"M"

        },{
        p_id:7877,
        p_name:"Kim West",
        p_dob:"1/11/1995",
        p_bloodGroup:"A+",
        p_sex:"M"

        },{
        p_id:7999,
        p_name:"Sakura Nara",
        p_dob:"13/07/1997",
        p_bloodGroup:"B-",
        p_sex:"F"

        }
        ]


}

interface PatientItem{
    p_id:number;
    p_name:string;
    p_dob:string;
    p_bloodGroup:string;
    p_sex:string;
}

interface PatientItems{
    patientItems: PatientItem[];
}