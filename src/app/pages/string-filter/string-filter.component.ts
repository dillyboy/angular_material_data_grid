import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.scss']
})
export class StringFilterComponent implements OnInit {
  ts = `
headings: GridHeading[] = [
  ...
  { fieldName: 'email', display: 'Email', type: 'string' },
]
`;
  constructor() { }

  ngOnInit(): void {
  }

}
