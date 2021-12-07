import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  GridButtonClick,
  GridFilterItem,
  GridHeading,
  GridRequest,
  GridResponse,
  GridSortItem
} from '../../../../projects/angular-material-data-grid/src/lib/angular-material-data-grid-interfaces';

@Component({
  selector: 'app-client-side-pagination-grid-example',
  templateUrl: './client-side-pagination-grid-example.component.html',
  styleUrls: ['./client-side-pagination-grid-example.component.scss']
})
export class ClientSidePaginationGridExampleComponent implements OnInit {

  usage = {
    html: `
  <amdg-grid
      *ngIf="showGrid"
      [headings]="headings"
      [url]="url"
      [selection]="true"
      [columnControl]="true"
      (requestBodyEmit)="requestBodyChanged($event)"
      (responseEmit)="responseReceived($event)"
      (selectionEmit)="selectionChanged($event)"
      (filtersChangedEmit)="filtersChanged($event)"
      (sortChangedEmit)="sortChanged($event)"
      (buttonClickEmit)="buttonClick($event)"
      (columnPreferencesChangedEmit)="headingsConfigChanged($event)"
      (columnPreferencesResetEmit)="resetColumnPreferencesClick()">
  </amdg-grid>`,
    ts: `
  /* POST endpoint URL */
  url = 'https://angular-grid.herokuapp.com/getAllUsers';

  /* Unique identifier can be used to save user's column preferences */
  GRID_ID = 'demoGrid' as const;

  showGrid = true;

  /* Original column configuration */
  initialHeadings: GridHeading[] = [
    {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, textAlign: 'right'},
    {fieldName: 'full_name', display: 'Full Name', type: 'string', width: '160px', clickable: 'url',
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
        url: 'https://angular-grid.herokuapp.com/countries',
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
    {fieldName: 'actions', display: '', type: 'button-group', width: '105px',
      other: {
        mainButton: {
          display: 'Options',
          icon: 'expand_more',
          disableField: 'archived'
        },
        buttons: [
          {display: 'Edit User', icon: 'edit', disableField: 'disableEdit'},
          {display: 'Delete User', icon: 'delete', disableField: 'archived'},
        ]
      },
      textAlign: 'center', disableSorting: true,
    }
  ];

  /* Column configuration which will be passed to grid */
  headings: GridHeading[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    /* Custom code that can be used to either retrieve user's column preference from local storage
       or from the original configuration based on availability.
       This can also be done by calling an API endpoint in production application's so that the user
       preferences will not be lost between sessions. */
    const demoGridUserPreference: GridHeading[] = JSON.parse(localStorage.getItem(this.GRID_ID) || '{}');
    if (Object.entries(demoGridUserPreference).length > 0) {
      this.headings = demoGridUserPreference;
    } else {
      this.headings = this.initialHeadings;
    }
  }

  requestBodyChanged(body: GridRequest): void {
    console.log(body);
  }

  responseReceived(response: GridResponse): void {
    /* Simple example of manipulating some data retrieved through the grid component */
    response.gridData.forEach(item => {
      item.date_of_birth = item.date_of_birth.substring(0, 10);
      if (item.id === 16) {
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

  sortChanged(sortObject: GridSortItem): void {
    console.log(sortObject);
  }

  buttonClick(button: GridButtonClick): void {
    console.log(button);
  }

  headingsConfigChanged(headings: GridHeading[]): void {
    /* Saving the user's column preference in local storage */
    localStorage.setItem(this.GRID_ID, JSON.stringify(headings));
  }

  resetColumnPreferencesClick(): void {
    localStorage.removeItem(this.GRID_ID);
    this.headings = JSON.parse(JSON.stringify(this.initialHeadings));
    this.showGrid = false;
    this.changeDetectorRef.detectChanges();
    this.showGrid = true;
    this.changeDetectorRef.detectChanges();
  }
`};

  url = `${environment.api}getAllUsers`;

  GRID_ID = 'demoGrid' as const;

  showGrid = true;

  initialHeadings: GridHeading[] = [
    {fieldName: 'id', display: 'ID', type: 'number', width: '100px', disableSorting: true, textAlign: 'right'},
    {fieldName: 'full_name', display: 'Full Name', type: 'string', width: '160px', clickable: 'url',
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
    {fieldName: 'actions', display: '', type: 'button-group', width: '105px',
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
      textAlign: 'center', disableSorting: true,
    }
  ];

  headings: GridHeading[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    const demoGridUserPreference: GridHeading[] = JSON.parse(localStorage.getItem(this.GRID_ID) || '{}');
    if (Object.entries(demoGridUserPreference).length > 0) {
      this.headings = demoGridUserPreference;
    } else {
      this.headings = this.initialHeadings;
    }
  }

  requestBodyChanged(body: GridRequest): void {
    console.log(body);
  }

  responseReceived(response: GridResponse): void {
    response.gridData.forEach(item => {
      item.date_of_birth = item.date_of_birth.substring(0, 10);
      if (item.id === 16) {
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

  sortChanged(sortObject: GridSortItem): void {
    console.log(sortObject);
  }

  buttonClick(button: GridButtonClick): void {
    console.log(button);
  }

  headingsConfigChanged(headings: GridHeading[]): void {
    /* Saving the user's column preference in local storage */
    localStorage.setItem(this.GRID_ID, JSON.stringify(headings));
  }

  resetColumnPreferencesClick(): void {
    localStorage.removeItem(this.GRID_ID);
    this.headings = JSON.parse(JSON.stringify(this.initialHeadings));
    this.showGrid = false;
    this.changeDetectorRef.detectChanges();
    this.showGrid = true;
    this.changeDetectorRef.detectChanges();
  }

  scrollBottom(): void {
    window.scrollTo(0, 1000);
  }
}
