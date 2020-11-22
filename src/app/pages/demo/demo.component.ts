import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  GirdButtonClick,
  GridFilterItem,
  GridHeading,
  GridResponse
} from '../../angular-material-data-grid/angular-material-data-grid-interfaces';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

  url = `${environment.api}getUsers`;

  headings: GridHeading[] = [
    {fieldName: 'uid', display: 'ID', type: 'number', width: '100px', disableSorting: true, align: 'right'},
    {fieldName: 'first_name', display: 'First Name', type: 'url', width: '120px',
      other: {
        openTab: true,
        urlTemplate: '/gettingStarted/demo/:uid',
        queryParams: {userEmail: 'email'}
      },
      filterType: 'tag'
    },
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
    {fieldName: 'date_of_birth', display: 'Date Of Birth', type: 'date', width: '150px'},
    {fieldName: 'ip_address', display: 'IP Address', type: 'string', width: '150px'},
    {fieldName: 'car', display: 'Car', type: 'string', width: '150px'},
    {fieldName: 'phone', display: 'Phone', type: 'string', width: '150px'},
    {fieldName: 'movie_taste', display: 'Movie Taste', type: 'string', width: '150px', show: false},
    {fieldName: 'country', display: 'Country', type: 'string', width: '130px',
      filterType: 'multi-select',  show: true,
      other: {
        selectionMode: 'multiple',
        source: 'external',
        url: `${environment.api}countries`,
        key: 'displayName',
        value: 'value'
      }
    },
    {fieldName: 'city', display: 'City', type: 'string', width: '150px', show: false},
    {fieldName: 'company', display: 'Company', type: 'string', width: '150px', show: false},
    {fieldName: 'iban', display: 'Iban', type: 'string', width: '150px', show: false},
    {fieldName: 'latitude', display: 'Latitude', type: 'string', width: '150px', show: false},
    {fieldName: 'longitude', display: 'Longitude', type: 'string', width: '150px', show: false},
    {fieldName: 'currency', display: 'Currency', type: 'string', width: '150px', show: false},
    {fieldName: 'username', display: 'Username', type: 'string', width: '150px', show: false},
    {fieldName: 'profession', display: 'Profession', type: 'string', width: '150px', show: false},
    {fieldName: 'state', display: 'State', type: 'string', width: '150px', show: false},
    {fieldName: 'actions', display: '', type: 'button-group', width: '100px',
      other: {
        mainButton: {
          display: 'Options',
          icon: 'expand_more',
          disableField: `archived`
        },
        buttons: [
          {display: 'Edit User', icon: 'edit', disableField: 'disableEdit'},
          {display: 'Delete User', icon: 'delete', disableField: `archived`},
        ]
      },
      align: 'center', disableSorting: true,
    }
  ];

  responseReceived(response: GridResponse): void {
    response.gridData.forEach(item => {
      // item.date_of_birth = item.date_of_birth.substring(0, 10);
      if (item.uid === 16) {
        item.disableEdit = true;
      }
    });
  }

  selectionChanged(items: any[]): void {
    console.log(items);
  }

  filtersChanged(filters: GridFilterItem[]): void {
    console.log(filters);
  }

  buttonClick(button: GirdButtonClick): void {
    console.log(button);
  }
}
