import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-select-filter',
  templateUrl: './multi-select-filter.component.html',
  styleUrls: ['./multi-select-filter.component.scss']
})
export class MultiSelectFilterComponent implements OnInit {

  ts = `
headings: GridHeading[] = [
  ...
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
  {fieldName: 'country', display: 'Country', type: 'string', width: '130px',
    filterType: 'multi-select',  show: true,
    other: {
      selectionMode: 'multiple',
      source: 'external',
      url: 'https://angular-grid.onrender.com/countries',
      key: 'displayName',
      value: 'value'
    }
  },
]
`;

  constructor() { }

  ngOnInit(): void {
  }

}
