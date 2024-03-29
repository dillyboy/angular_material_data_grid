import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GridHeading, GridMasterDetailConfig, GridResponse } from '../../../../projects/angular-material-data-grid/src/lib/angular-material-data-grid-interfaces';

@Component({
  selector: 'app-master-detail-breakdown-grid-example',
  templateUrl: './master-detail-breakdown-grid-example.component.html',
  styleUrls: ['./master-detail-breakdown-grid-example.component.scss']
})
export class MasterDetailBreakdownGridExampleComponent {

  template = `\`<div class="amdg-p-2">
                   <h2>#{{order_id}}</h2>
                   <div style="height: 90px; resize: none; border-radius: 4px; border: 1px solid; padding: 10px; box-sizing: border-box;" class="amdg-w-100">
                     <p><b>Customer Name:</b> {{first_name}} {{last_name}}</p>
                     <p><b>Order Status:</b> <span style="display: inline-block;width: 20px;height: 20px;border-radius: 20px;background: {{delivery_status_color}}; position: relative;top: 6px;margin: 0 5px;"></span> {{delivery_status}}</p>
                   </div>
               </div>\``;
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
  url = 'https://angular-grid.onrender.com/getOrderData';

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
    type: 'html',
    multipleExpansion: true,
    template: ` + this.template + `,
  };

  entity = null;

  responseReceived(response: GridResponse): void {
    /* Simple example of manipulating some data retrieved through the grid component */
    response.gridData.forEach(item => {
      item.order_date = item.order_date.substring(0, 10);
      item.delivery_status_color = item.delivery_status === 'PENDING' ? '#e74c3c' : '#2ecc71';
    });
  }
`};

  /* POST endpoint URL */
  url = `${environment.api}getOrderData`;

  /* Original column configuration */
  headings: GridHeading[] = [
    {fieldName: 'order_id', display: 'ID', type: 'string', width: '130px', background: '#ff7675', color: 'white'},
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
    {fieldName: 'cart_items', display: 'Cart Items', type: 'number', width: '120px', textAlign: 'center'}
  ];

  expandableConfig: GridMasterDetailConfig = {
    type: 'breakdown',
    multipleExpansion: true,
    template: `<div class="amdg-p-2">
                   <h2 class="amdg-m-0">#{{order_id}}</h2>
               </div>`
  };

  entity = null;

  constructor() { }

  responseReceived(response: GridResponse): void {
    /* Simple example of manipulating some data retrieved through the grid component */
    response.gridData.forEach(item => {
      item.amdgBreakdownGridRecords = [
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
        {
          cart_items: 2,
          delivery_status: 'PENDING',
          email_address: 'thansemann13@newyorker.com ',
          first_name: 'Talbert',
          last_name: 'Hansemann',
          order_date: '2019-09-14T18:30:00.000Z',
          order_id: 'ORD-0000001',
          payment_type: 'CASH',
          phone_number: '316-433-9361',
          postcode_or_zip: '',
          shipping_type: 'STORE PICKUP',
          street_name: 'Corscot',
          town_or_city: 'Kyaukse',
          _id: '60d9b38b84a5830adb91b82a'
        },
      ];
    });
  }

  scrollBottom(): void {
    window.scrollTo(0, 1000);
  }

}
