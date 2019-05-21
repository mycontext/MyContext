import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buyer',
  templateUrl: './asset.component.html'
})
export class AssetComponent {
  loading: boolean = true;
  public assetList: AssetDto[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<AssetDto[]>(baseUrl + 'api/asset').subscribe(result => {
      this.assetList = result;
    }, error => console.error(error));
    this.loading = false;
  }
}

