import { Component } from '@angular/core';
import { GridButtonClick, GridHeading, GridResponse } from 'angular-material-data-grid';
import { MatDialog} from '@angular/material/dialog';
import { GridWithinDialogComponent } from './grid-within-dialog/grid-within-dialog.component';

@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.scss']
})
export class OpenDialogComponent {

  usage = {
    html: `
  <amdg-grid
      [headings]="headings"
      [url]="url"
      [selection]="true"
      [serverSidePagination]="true"
      [entity]="entity"
      (buttonClickEmit)="buttonClick($event)"
      (responseEmit)="responseReceived($event)">
  </amdg-grid>`,
    ts: `
  /* POST endpoint URL */
  url = 'https://angular-grid.herokuapp.com/getOrderData';

  /* Column configuration */
  headings: GridHeading[] = [
    {fieldName: 'actions', display: 'View Order', type: 'button-group', width: '118px',
      other: {
        buttons: [
          {display: 'Open', icon: 'search', disableField: 'disableEdit'}
        ]
      },
      textAlign: 'center', disableSorting: true,
    },
    {fieldName: 'order_id', display: 'ID', type: 'string', width: '130px'},
    {fieldName: 'order_date', display: 'Date', type: 'date', width: '110px'},
    {fieldName: 'delivery_status', display: 'Delivery Status', type: 'string', width: '130px',
      filterType: 'multi-select',
      other: {
        selectionMode: 'single',
        source: 'internal',
        optionsObject: [
          {text : 'Pending', value: 'PENDING'},
          {text : 'Delivered', value: 'DELIVERED'}
        ]
      }
    },
    {fieldName: 'first_name', display: 'First Name', type: 'string', width: '120px'},
    {fieldName: 'last_name', display: 'Last Name', type: 'string', width: '120px'},
    {fieldName: 'town_or_city', display: 'Town / City', type: 'string', width: '140px'},
    {fieldName: 'postcode_or_zip', display: 'Postcode / ZIP', type: 'string', width: '140px'},
    {fieldName: 'street_name', display: 'Street Name', type: 'string', width: '130px'},
    {fieldName: 'email_address', display: 'Email Address', type: 'string', width: '170px'},
    {fieldName: 'phone_number', display: 'Phone Number', type: 'string', width: '130px'},
    {fieldName: 'payment_type', display: 'Payment Type', type: 'string', width: '120px',
      filterType: 'multi-select',
      other: {
        selectionMode: 'single',
        source: 'internal',
        optionsObject: [
          {text : 'CASH', value: 'CASH'},
          {text : 'CARD', value: 'CARD'}
        ]
      }
    },
    {fieldName: 'shipping_type', display: 'Shipping Type', type: 'string', width: '130px',
      filterType: 'multi-select',
      other: {
        selectionMode: 'single',
        source: 'internal',
        optionsObject: [
          {text : 'STORE PICKUP', value: 'STORE PICKUP'},
          {text : 'DELIVERY', value: 'DELIVERY'}
        ]
      }
    },
    {fieldName: 'cart_items', display: 'Cart Items', type: 'number', width: '120px', textAlign: 'right'}
  ];

  entity = null;

  constructor(public dialog: MatDialog) { }

  buttonClick(button: GridButtonClick): void {
    if (button.fieldName === 'actions') {
      this.dialog.open(GridWithinDialogComponent,
        {
          width: '1300px',
          data: { order_id: button.item.order_id }
        });
    }
  }

  responseReceived(response: GridResponse): void {
    /* Simple example of manipulating some data retrieved through the grid component */
    response.gridData.forEach(item => {
      item.order_date = item.order_date.substring(0, 10);
    });
  }
`, gridWithinDialogHtml: `
  <amdg-grid
    [headings]="headings"
    [url]="url"
    [serverSidePagination]="true"
    [entity]="entity">
  </amdg-grid>
`, gridWithinDialogTs: `
  /* POST endpoint URL */
  url = 'https://angular-grid.herokuapp.com/getProductsData';

  /* Column configuration */
  headings: GridHeading[] = [
    {fieldName: 'product_id', display: 'ID', type: 'string', width: '140px', filterType: 'tag'},
    {fieldName: 'product_image_url', display: 'Image', type: 'image-url', width: '98px', disableSorting: true},
    {fieldName: 'product_name', display: 'Name', type: 'string', width: '280px'},
    {fieldName: 'product_price', display: 'Price', type: 'number', width: '100px'},
    {fieldName: 'product_discounted_price', display: 'Discounted Price', type: 'number', width: '140px'},
    {fieldName: 'currency', display: 'Currency', type: 'string', width: '100px', disableSorting: true, disableFiltering: true },
  ];

  entity = null;

  constructor(public dialogRef: MatDialogRef<GridWithinDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.entity = this.data;
  }
`
};

  /* POST endpoint URL */
  url = 'https://angular-grid.herokuapp.com/getOrderData';

  /* Column configuration */
  headings: GridHeading[] = [
    {fieldName: 'actions', display: 'View Order', type: 'button-group', width: '118px',
      other: {
        buttons: [
          {display: 'Open', icon: 'search', disableField: 'disableEdit'}
        ]
      },
      textAlign: 'center', disableSorting: true,
    },
    {fieldName: 'order_id', display: 'ID', type: 'string', width: '130px'},
    {fieldName: 'order_date', display: 'Date', type: 'date', width: '110px'},
    {fieldName: 'delivery_status', display: 'Delivery Status', type: 'string', width: '130px',
      filterType: 'multi-select',
      other: {
        selectionMode: 'single',
        source: 'internal',
        optionsObject: [
          {text : 'Pending', value: 'PENDING'},
          {text : 'Delivered', value: 'DELIVERED'}
        ]
      }
    },
    {fieldName: 'first_name', display: 'First Name', type: 'string', width: '120px'},
    {fieldName: 'last_name', display: 'Last Name', type: 'string', width: '120px'},
    {fieldName: 'town_or_city', display: 'Town / City', type: 'string', width: '140px'},
    {fieldName: 'postcode_or_zip', display: 'Postcode / ZIP', type: 'string', width: '140px'},
    {fieldName: 'street_name', display: 'Street Name', type: 'string', width: '130px'},
    {fieldName: 'email_address', display: 'Email Address', type: 'string', width: '170px'},
    {fieldName: 'phone_number', display: 'Phone Number', type: 'string', width: '130px'},
    {fieldName: 'payment_type', display: 'Payment Type', type: 'string', width: '120px',
      filterType: 'multi-select',
      other: {
        selectionMode: 'single',
        source: 'internal',
        optionsObject: [
          {text : 'CASH', value: 'CASH'},
          {text : 'CARD', value: 'CARD'}
        ]
      }
    },
    {fieldName: 'shipping_type', display: 'Shipping Type', type: 'string', width: '130px',
      filterType: 'multi-select',
      other: {
        selectionMode: 'single',
        source: 'internal',
        optionsObject: [
          {text : 'STORE PICKUP', value: 'STORE PICKUP'},
          {text : 'DELIVERY', value: 'DELIVERY'}
        ]
      }
    },
    {fieldName: 'cart_items', display: 'Cart Items', type: 'number', width: '120px', textAlign: 'right'}
  ];

  entity = null;

  constructor(public dialog: MatDialog) { }


  buttonClick(button: GridButtonClick): void {
    if (button.fieldName === 'actions') {
      this.dialog.open(GridWithinDialogComponent,
        {
          width: '1300px',
          data: { order_id: button.item.order_id }
        });
    }
  }

  responseReceived(response: GridResponse): void {
    /* Simple example of manipulating some data retrieved through the grid component */
    response.gridData.forEach(item => {
      item.order_date = item.order_date.substring(0, 10);
    });
  }

  scrollBottom(): void {
    window.scrollTo(0, 1000);
  }

}
