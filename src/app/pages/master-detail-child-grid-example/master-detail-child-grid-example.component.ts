import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GridHeading, GridResponse, GridMasterDetailConfig } from '../../../../projects/angular-material-data-grid/src/lib/angular-material-data-grid-interfaces';

@Component({
  selector: 'app-master-detail-child-grid-example',
  templateUrl: './master-detail-child-grid-example.component.html',
  styleUrls: ['./master-detail-child-grid-example.component.scss']
})
export class MasterDetailChildGridExampleComponent {

  usage = {
    html: `
    <amdg-grid
      [headings]="headings"
      [url]="url"
      [selection]="true"
      [serverSidePagination]="true"
      [entity]="entity"
      [expandable]="true"
      [expandableConfig]="expandableConfig"
      (responseEmit)="responseReceived($event)">
  </amdg-grid>`,
    ts: `
  /* POST endpoint URL */
  url = 'https://angular-grid.herokuapp.com/getOrderData';

  /* Column configuration */
  headings: GridHeading[] = [
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

  expandableConfig: GridMasterDetailConfig = {
    type: 'table',
    multipleExpansion: true,
    childGrid: {
      headings: [
        {fieldName: 'product_id', display: 'ID', type: 'string', width: '140px', filterType: 'tag'},
        {fieldName: 'product_image_url', display: 'Image', type: 'image-url', width: '80px', disableSorting: true, textAlign: 'center'},
        {fieldName: 'product_name', display: 'Name', type: 'string', width: '280px'},
        {fieldName: 'product_price', display: 'Price', type: 'number', width: '100px'},
        {fieldName: 'product_discounted_price', display: 'Discounted Price', type: 'number', width: '140px'},
        {fieldName: 'currency', display: 'Currency', type: 'string', width: '100px', disableSorting: true, disableFiltering: true },
      ],
      url: 'https://angular-grid.herokuapp.com/getProductsData',
      entity : {
        order_id: '{{order_id}}' // pass order id on row
      },
      serverSidePagination: true
    }
  };

  entity = null;

  responseReceived(response: GridResponse): void {
    /* Simple example of manipulating some data retrieved through the grid component */
    response.gridData.forEach(item => {
      item.order_date = item.order_date.substring(0, 10);
    });
  }
`};

  /* POST endpoint URL */
  url = `${environment.api}getOrderData`;

  /* Original column configuration */
  headings: GridHeading[] = [
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

  expandableConfig: GridMasterDetailConfig = {
    type: 'table',
    multipleExpansion: false,
    childGrid: {
      headings: [
        {fieldName: 'product_id', display: 'ID', type: 'string', width: '140px', filterType: 'tag'},
        {fieldName: 'product_image_url', display: 'Image', type: 'image-url', width: '80px', disableSorting: true, textAlign: 'center'},
        {fieldName: 'product_name', display: 'Name', type: 'string', width: '280px'},
        {fieldName: 'product_price', display: 'Price', type: 'number', width: '100px'},
        {fieldName: 'product_discounted_price', display: 'Discounted Price', type: 'number', width: '140px'},
        {fieldName: 'currency', display: 'Currency', type: 'string', width: '100px', disableSorting: true, disableFiltering: true },
      ],
      url: `${environment.api}getProductsData`,
      entity : {
        order_id: '{{order_id}}'
      },
      serverSidePagination: true
    }
  };

  entity = null;

  constructor() { }

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
