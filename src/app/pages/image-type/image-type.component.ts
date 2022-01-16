import { Component } from '@angular/core';

@Component({
  selector: 'app-image-type',
  templateUrl: './image-type.component.html',
  styleUrls: ['./image-type.component.scss']
})
export class ImageTypeComponent {

  ts = `
headings: GridHeading[] = [
  ...
  {fieldName: 'product_image_url', display: 'Image', type: 'image-url', width: '80px', disableSorting: true, textAlign: 'center'},
]`;

}
