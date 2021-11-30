import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GridFilterItem, GridHeading } from 'angular-material-data-grid';

@Component({
  selector: 'app-dynamic-headings-example',
  templateUrl: './dynamic-headings-example.component.html',
  styleUrls: ['./dynamic-headings-example.component.scss']
})
export class DynamicHeadingsExampleComponent {

  /* POST endpoint URL */
  url = `${environment.api}getUsers`;


  headings: GridHeading[] = [];
  /* Original column configuration */
  headingsCopy: GridHeading[] = [
    {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, textAlign: 'right'},
    {fieldName: 'full_name', display: 'Full Name', type: 'string', width: '160px', clickable: 'url',
      other: {
        openTab: true,
        urlTemplate: '/gettingStarted/demo/:id',
        queryParams: {userEmail: 'email'}
      },
      filterType: 'tag'
    },
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

  initialFilters: GridFilterItem[] = [];

  constructor() {
    this.categoryChanged(1);
  }

  categoryChanged(columnOrderId): void {
    let columnOrder = [];
    const defaultOrder = ['id', 'first_name', 'last_name', 'email', 'gender'];

    switch (columnOrderId) {
      case 1:
        columnOrder = JSON.parse(JSON.stringify(defaultOrder));
        break;
      case 2:
        columnOrder = ['id', 'full_name', 'first_name', 'last_name', 'email'];
        break;
    }

    const reorderedHeadings = [];
    columnOrder.forEach(order => {
      this.headingsCopy.forEach(heading => {
        if (order === heading.fieldName) {
          // if (heading.fieldName === sortedField) {
          //   heading.sort = sortType;
          // }
          reorderedHeadings.push(heading);
        }
      });
    });

    this.headings = reorderedHeadings;
  }

}
