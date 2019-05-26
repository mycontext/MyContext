import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html'
})
export class BuyerComponent {
  public buyerList: BuyerDto[]; 

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<BuyerDto[]>(baseUrl + 'api/buyer').subscribe(result => {
      this.buyerList = result;
    }, error => console.error(error)); 
  }
}

