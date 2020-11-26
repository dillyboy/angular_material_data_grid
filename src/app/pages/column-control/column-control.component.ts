import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-control',
  templateUrl: './column-control.component.html',
  styleUrls: ['./column-control.component.scss']
})
export class ColumnControlComponent implements OnInit {

  ts = `
headings: GridHeading[] = [
  ...
  {fieldName: 'phone', display: 'Phone', type: 'string', width: '150px'},
  {fieldName: 'movie_taste', display: 'Movie Taste', type: 'string', width: '150px', show: false},
  {fieldName: 'country', display: 'Country', type: 'string', width: '130px', show: true},
]`;
  constructor() { }

  ngOnInit(): void {
  }

}
