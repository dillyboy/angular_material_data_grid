import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {

  angularMaterial = `ng add @angular/material`;
  npmInstall = `// The version you install depends on the verison of Angular Material you are using

// Between Angular Material verison 10.2.7 and 13.3.9
npm i angular-material-data-grid@0.6.1
// Between Angular Material verison 14.0.0 and 14.2.5
npm i angular-material-data-grid@0.8.0
// Angular Material verison 15.0.0 and above
npm i angular-material-data-grid`;
  modules = `
import { AngularMaterialDataGridModule } from 'angular-material-data-grid';

imports: [
    ...
    AngularMaterialDataGridModule
]`;

  usage = {
    html: `
<!--Below is an example of a server side paginated grid-->

<amdg-grid
    [headings]="headings"
    [url]="url"
    [serverSidePagination]="true"
    (responseEmit)="responseReceived($event)">
</amdg-grid>
`,
    ts: `
// import { GridHeading, GridResponse } from 'angular-material-data-grid';

url = 'https://angular-grid.onrender.com/getUsers'; // add your POST endpoint here later
/* Try https://angular-grid.onrender.com/getAllUsers for client side pagination */

headings: GridHeading[] = [
  {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, textAlign: 'right'},
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
];

responseReceived(response: GridResponse): void {
  console.log(response); // If necessary manipulate the data or use data in the parent component
}
`};
  constructor() { }

  ngOnInit(): void {
  }

}
