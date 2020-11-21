import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {

  angularMaterial = `ng add @angular/material`;
  modules = `
import {
  AngularMaterialDataGridModule
} from './angular-material-data-grid/angular-material-data-grid.module'

// location may change depending on placement

imports: [
    ...
    AngularMaterialDataGridModule
]`;

  usage = {
    html: `
<app-angular-material-data-grid
    [headings]="headings"
    [url]="url"
    (responseEmit)="responseReceived($event)>
</app-angular-material-data-grid>`,
    ts: `
import {
  GridHeadingInterface,
  GridResponseInterface
} from '../../angular-material-data-grid/angular-material-data-grid-interfaces';

url = 'https://angular-grid.herokuapp.com/getUsers'; // add your POST endpoint here later

headings: GridHeadingInterface[] = [
  {fieldName: 'uid', display: 'ID', type: 'number', width: '100px', disableSorting: true, align: 'right'},
  {fieldName: 'first_name', display: 'First Name', type: 'string', width: '120px'},
  {fieldName: 'email', display: 'Email', type: 'string', width: '180px'},
  {fieldName: 'gender', display: 'Gender', type: 'string', width: '100px',
    filterType: 'multi-select',
    other: {
      selectionMode: 'single',
      source: 'internal',
      optionsObject: [
        {text : 'Female', value: 'FEMALE'},
        {text : 'Male', value: 'MALE'}
      ]
    }
  },
  {fieldName: 'date_of_birth', display: 'Date Of Birth', type: 'date', width: '150px'}
]

responseReceived(response: GridResponseInterface): void {
  console.log(response); // If necessary manipulate the data or use data in the parent component
}
`,
    css: `@import "app/angular-material-data-grid/angular-material-data-grid-utilities";
// add this to your styles.css file`
  };
  constructor() { }

  ngOnInit(): void {
  }

}
