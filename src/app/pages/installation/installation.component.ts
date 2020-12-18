import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {

  angularMaterial = `ng add @angular/material`;
  modules = `
import { AngularMaterialDataGridModule } from 'angular-material-data-grid';

imports: [
    ...
    AngularMaterialDataGridModule
]`;

  usage = {
    html: `
<!--Use <amdg-grid> for client side paginated grids-->
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

url = 'https://angular-grid.herokuapp.com/getUsers'; // add your POST endpoint here later
/* Try https://angular-grid.herokuapp.com/getAllUsers for client side pagination */

headings: GridHeading[] = [
  {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, align: 'right'},
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

responseReceived(response: GridResponse): void {
  console.log(response); // If necessary manipulate the data or use data in the parent component
}
`};
  constructor() { }

  ngOnInit(): void {
  }

}
