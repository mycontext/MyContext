import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html'
})
export class RecorderComponent {
  public recorderList:  RecorderDto[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get< RecorderDto[]>(baseUrl + 'api/recorder').subscribe(result => {
      this.recorderList = result;
    }, error => console.error(error));
  }
}

