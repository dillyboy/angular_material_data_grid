import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GridHeading, GridResponse } from 'angular-material-data-grid';

@Component({
  selector: 'app-cell-styles-example',
  templateUrl: './cell-styles-example.component.html',
  styleUrls: ['./cell-styles-example.component.scss']
})
export class CellStylesExampleComponent {

  usage = {
    html: `
  <!--Targeting an individual cell with styles will be available in a future build-->
  <amdg-grid
      [headings]="headings"
      [url]="url"
      [serverSidePagination]="true"
      (responseEmit)="responseReceived($event)">
  </amdg-grid>`,
    ts: `
  /* POST endpoint URL */
  url = 'https://angular-grid.herokuapp.com/getUsers';

  /* Column configuration */
  headings: GridHeading[] = [
    {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, textAlign: 'right'},
    {fieldName: 'first_name', display: 'First Name', type: 'string', width: '120px', filterType: 'tag',
      textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold', background: 'rgb(116 185 255 / 50%)'},
    {fieldName: 'last_name', display: 'Last Name', type: 'string', width: '120px', filterType: 'tag', color: '#00b894'},
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
    }
  ];

  responseReceived(response: GridResponse): void {
    /* Simple example of manipulating some data retrieved through the grid component */
    response.gridData.forEach(item => {
      /* Color row if id is divisible by 5 */
      if (item.id % 5 === 0) {
        /* amdgGridRowBackground is a grid's reserved word,
         this value can also be sent from the backend directly per record by passing a color value */
        item.amdgGridRowBackground = 'rgb(253 121 168 / 50%)';
      }
    });
  }
`};

  /* POST endpoint URL */
  url = `${environment.api}getUsers`;

  /* Original column configuration */
  headings: GridHeading[] = [
    {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, textAlign: 'right'},
    {fieldName: 'first_name', display: 'First Name', type: 'string', width: '120px', filterType: 'tag',
      textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold', background: 'rgb(116 185 255 / 50%)'},
    {fieldName: 'last_name', display: 'Last Name', type: 'string', width: '120px', filterType: 'tag', color: '#00b894'},
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
    }
  ];

  responseReceived(response: GridResponse): void {
    /* Simple example of manipulating some data retrieved through the grid component */
    response.gridData.forEach(item => {
      /* Color row if id is divisible by 5 */
      if (item.id % 5 === 0) {
        /* amdgGridRowBackground is a grid's reserved word,
         this value can also be sent from the backend directly per record by passing a color value */
        item.amdgGridRowBackground = 'rgb(253 121 168 / 50%)';
      }
    });
  }

  scrollBottom(): void {
    window.scrollTo(0, 1000);
  }

}
