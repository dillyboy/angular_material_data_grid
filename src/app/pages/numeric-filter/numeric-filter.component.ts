import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numeric-filter',
  templateUrl: './numeric-filter.component.html',
  styleUrls: ['./numeric-filter.component.scss']
})
export class NumericFilterComponent implements OnInit {

  ts = `
headings: GridHeading[] = [
  ...
  { fieldName: 'uid', display: 'ID', type: 'number' },
]
`;
  constructor() { }

  ngOnInit(): void {
  }

}
