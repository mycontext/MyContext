import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators' 
@Component({
  selector: 'app-buyer',
  templateUrl: './asset.component.html'
})
export class AddAssetComponent {
  loading: boolean = true;
  public assetList: AssetDto[]; 

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
   
    this.loading = false;
  }

  onsubmit(assetDto: AssetDto) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>(this.baseUrl + 'api/asset', assetDto, { headers: headers })
     ;
  }
}

