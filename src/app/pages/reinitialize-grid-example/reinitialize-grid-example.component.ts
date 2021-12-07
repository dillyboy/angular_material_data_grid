import { Component } from '@angular/core';
import { GridHeading } from '../../../../projects/angular-material-data-grid/src/lib/angular-material-data-grid-interfaces';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reinitialize-grid-example',
  templateUrl: './reinitialize-grid-example.component.html',
  styleUrls: ['./reinitialize-grid-example.component.scss']
})
export class ReinitializeGridExampleComponent {

  usage = {
    html: `
  <div style="margin-bottom: 24px">
    <p>This example shows how to reinitialize the grid from parent component</p>
    <button mat-raised-button type="button" (click)="resetPressed()" class="mr-3">Reinitialize with current filters</button>
    <span>or</span>
    <button mat-raised-button type="button" (click)="resetWithFilters()" class="ml-3">Reinitialize by resetting all filters</button>
  </div>

  <amdg-grid
      [headings]="headings"
      [url]="url"
      [selection]="true"
      [serverSidePagination]="true"
      [entity]="entity"
      [resetFilters]="resetFilters">
  </amdg-grid>`,
    ts: `
  /* POST endpoint URL */
  url = 'https://angular-grid.herokuapp.com/getUsers';

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

  entity: any = null;
  resetFilters: any = null;

  resetPressed(): void {
    this.entity = {};
  }

  resetWithFilters(): void {
    this.resetFilters = {};
  }
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

  entity: any = null;
  resetFilters: any = null;

  resetPressed(): void {
    this.entity = {};
  }

  resetWithFilters(): void {
    this.resetFilters = {};
  }

  scrollBottom(): void {
    window.scrollTo(0, 1000);
  }

}
