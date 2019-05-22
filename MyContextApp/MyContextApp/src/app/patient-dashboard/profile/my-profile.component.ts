import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';


@Component({
    selector: 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
  })
  export class MyProfileComponent {
    form;

    constructor(private formBuilder : FormBuilder,private route: ActivatedRoute){

      }

      

    ngOnInit(){

          //this.requestItems=this.requestService.get();
          this.form=this.formBuilder.group({
            p_id: this.formBuilder.control({value:'7789', disabled:true}),
            p_name: this.formBuilder.control({value:'John Smith', disabled:true}),
            dob: this.formBuilder.control({value:'21/12/1991', disabled:true}),
            blood_group: this.formBuilder.control({value:'O+', disabled:true}),
            sex: this.formBuilder.control({value:'M', disabled:true})

        });

    }

    
  }
  