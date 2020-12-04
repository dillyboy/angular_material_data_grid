import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GirdButtonClick, GridFilterItem, GridHeading, GridResponse } from 'angular-material-data-grid';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

  url = `${environment.api}getUsers`;

  headings: GridHeading[] = [
    {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, align: 'right'},
    {fieldName: 'full_name', display: 'Full Name', type: 'url', width: '160px',
      other: {
        openTab: true,
        urlTemplate: '/gettingStarted/demo/:id',
        queryParams: {userEmail: 'email'}
      },
      filterType: 'tag'
    },
    {fieldName: 'first_name', display: 'First Name', type: 'string', width: '120px', filterType: 'tag', show: false},
    {fieldName: 'last_name', display: 'Last Name', type: 'string', width: '120px', filterType: 'tag', show: false},
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
    {fieldName: 'race', display: 'Race', type: 'string', width: '150px', show: false},
    {fieldName: 'date_of_birth', display: 'Date Of Birth', type: 'date', width: '130px'},
    {fieldName: 'ip_address', display: 'IP Address', type: 'string', width: '130px'},
    {fieldName: 'car', display: 'Car', type: 'string', width: '130px'},
    {fieldName: 'car_model', display: 'Car Model', type: 'string', width: '130px', show: false},
    {fieldName: 'car_vin', display: 'Car Vin', type: 'string', width: '150px', show: false},
    {fieldName: 'phone', display: 'Phone', type: 'string', width: '130px'},
    {fieldName: 'movie_genres', display: 'Movie Taste', type: 'string', width: '150px', show: false},
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
    {fieldName: 'country_code', display: 'Country Code', type: 'string', width: '110px', show: false},
    {fieldName: 'city', display: 'City', type: 'string', width: '120px', show: false},
    {fieldName: 'street', display: 'Street', type: 'string', width: '120px', show: false},
    {fieldName: 'street_no', display: 'Street No', type: 'string', width: '120px', show: false},
    {fieldName: 'postal_code', display: 'Postal Code', type: 'string', width: '120px', show: false},
    {fieldName: 'company', display: 'Company', type: 'string', width: '120px', show: false},
    {fieldName: 'products', display: 'Products', type: 'string', width: '170px', show: false},
    {fieldName: 'latitude', display: 'Latitude', type: 'string', width: '120px', show: false, disableFiltering: true},
    {fieldName: 'longitude', display: 'Longitude', type: 'string', width: '120px', show: false, disableFiltering: true},
    {fieldName: 'currency', display: 'Currency', type: 'string', width: '120px', show: false},
    {fieldName: 'currency_code', display: 'Currency Code', type: 'string', width: '120px', show: false},
    {fieldName: 'username', display: 'Username', type: 'string', width: '120px', show: false},
    {fieldName: 'job', display: 'Profession', type: 'string', width: '150px', show: false},
    {fieldName: 'state', display: 'State', type: 'string', width: '120px', show: false},
    {fieldName: 'state_short', display: 'State Short', type: 'string', width: '120px', show: false},
    {fieldName: 'personal_url', display: 'Personal Url', type: 'string', width: '200px', show: false},
    {fieldName: 'top_level_domain', display: 'Top Level Domain', type: 'string', width: '130px', show: false},
    {fieldName: 'time_zone', display: 'Time Zone', type: 'string', width: '130px', show: false},
    {fieldName: 'investments', display: 'Investments', type: 'string', width: '130px', show: false},
    {fieldName: 'stocks', display: 'Stocks', type: 'string', width: '130px', show: false},
    {fieldName: 'stock_name', display: 'Stock Name', type: 'string', width: '130px', show: false},
    {fieldName: 'stock_symbol', display: 'Stock Symbol', type: 'string', width: '130px', show: false},
    {fieldName: 'stock_cap', display: 'Stock Cap', type: 'string', width: '130px', show: false},
    {fieldName: 'shirt_size', display: 'Shirt Size', type: 'string', width: '130px', show: false},
    {fieldName: 'ssn', display: 'SSN', type: 'string', width: '130px', show: false},
    {fieldName: 'university', display: 'University', type: 'string', width: '130px', show: false},
    {fieldName: 'plant_family', display: 'Plant Family', type: 'string', width: '130px', show: false},
    {fieldName: 'quotes', display: 'Quotes', type: 'string', width: '130px', show: false},
    {fieldName: 'catch_phrase', display: 'Catch Phrase', type: 'string', width: '130px', show: false},
    {fieldName: 'app_id', display: 'App ID', type: 'string', width: '130px', show: false},
    {fieldName: 'likes_pets', display: 'Likes Pets', type: 'string', width: '130px', show: false},
    {fieldName: 'ein', display: 'EIN', type: 'string', width: '130px', show: false},
    {fieldName: 'fda_code', display: 'FDA Code', type: 'string', width: '130px', show: false},
    {fieldName: 'suffix', display: 'Suffix', type: 'string', width: '130px', show: false},
    {fieldName: 'number', display: 'Number', type: 'number', width: '130px', show: false},
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
      item.date_of_birth = item.date_of_birth.substring(0, 10);
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
