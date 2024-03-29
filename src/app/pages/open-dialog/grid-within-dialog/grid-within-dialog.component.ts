import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { GridHeading } from '../../../../../projects/angular-material-data-grid/src/lib/angular-material-data-grid-interfaces';


@Component({
  selector: 'app-grid-within-dialog',
  templateUrl: './grid-within-dialog.component.html',
  styleUrls: ['./grid-within-dialog.component.scss']
})
export class GridWithinDialogComponent implements OnInit {

  /* POST endpoint URL */
  url = 'https://angular-grid.onrender.com/getProductsData';

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

}
