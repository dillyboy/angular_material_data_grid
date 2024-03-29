import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GridFilterItem, GridHeading } from '../../../../projects/angular-material-data-grid/src/lib/angular-material-data-grid-interfaces';

@Component({
  selector: 'app-preconfigured-filters-example',
  templateUrl: './preconfigured-filters-example.component.html',
  styleUrls: ['./preconfigured-filters-example.component.scss']
})
export class PreconfiguredFiltersExampleComponent {

  usage = {
    html: `
  <amdg-grid
      [headings]="headings"
      [url]="url"
      [selection]="true"
      [serverSidePagination]="true"
      [initialFilters]="initialFilters"> <!--This line is needed for preconfigured filters-->
  </amdg-grid>`,
    ts: `
  /* POST endpoint URL */
  url = 'https://angular-grid.onrender.com/getUsers';

  /* Column configuration */
  headings: GridHeading[] = [
    {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, textAlign: 'right'},
    {fieldName: 'first_name', display: 'First Name', type: 'string', width: '120px', filterType: 'tag'},
    {fieldName: 'last_name', display: 'Last Name', type: 'string', width: '120px', filterType: 'tag'},
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

  initialFilters: GridFilterItem[] = [
    {
      field: 'gender',
      operator: 'eq',
      value: 'MALE'
    },
    {
      field: 'id',
      operator: 'between',
      value: '30-50'
    }
  ];
`};

  /* POST endpoint URL */
  url = `${environment.api}getUsers`;

  /* Original column configuration */
  headings: GridHeading[] = [
    {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, textAlign: 'right'},
    {fieldName: 'first_name', display: 'First Name', type: 'string', width: '120px', filterType: 'tag'},
    {fieldName: 'last_name', display: 'Last Name', type: 'string', width: '120px', filterType: 'tag'},
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

  initialFilters: GridFilterItem[] = [
    {
      field: 'gender',
      operator: 'eq',
      value: 'MALE'
    },
    {
      field: 'id',
      operator: 'between',
      value: '30-50'
    }
  ];

  constructor() { }

  scrollBottom(): void {
    window.scrollTo(0, 1000);
  }

}
