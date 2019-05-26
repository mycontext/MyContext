import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import {RequestService} from './my-request.service';

@Component({
    selector: 'my-request',
    templateUrl: './my-request.component.html'
  })
  export class MyRequestComponent {
    requestItems;

    constructor(private requestService: RequestService,
      private route: ActivatedRoute){

      }

      

    ngOnInit(){

          this.requestItems=this.requestService.get();


    }

    
  }
  