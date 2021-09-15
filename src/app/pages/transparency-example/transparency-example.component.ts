import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GridHeading } from 'angular-material-data-grid';

@Component({
  selector: 'app-transparency-example',
  templateUrl: './transparency-example.component.html',
  styleUrls: ['./transparency-example.component.scss']
})
export class TransparencyExampleComponent {

  usage = {
    html: `
    <!--Note that this looks aesthetically good in dark mode-->
    <div class="grid-container">
      <amdg-grid
          [headings]="headings"
          [url]="url"
          [selection]="true"
          [serverSidePagination]="true"
          [entity]="entity"
          [transparency]="true"> <!--This line is needed for grid transparency-->
      </amdg-grid>
    </div>`,
    scss: `
    .grid-container {
      background: url("/assets/logo.png") no-repeat right bottom;
      background-size: contain, cover;
    }
    `
  };

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

  entity = null;

  constructor() { }

  reinitialize(): void {
    this.entity = {};
  }

  scrollBottom(): void {
    window.scrollTo(0, 1000);
  }

}
