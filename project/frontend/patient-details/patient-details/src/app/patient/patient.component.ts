import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      report: 'positive',
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      report: 'negative',
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      report: 'positive',
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
