import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.scss']
})
export class StringFilterComponent implements OnInit {

  filterParam = '';
  filterApplied = false;

  stringFilterTypes = [
    {key: 'eq', display: 'Is equal to'},
    {key: 'neq', display: 'Is not equal to'},
    {key: 'contains', display: 'Contains'},
    {key: 'startswith', display: 'Starts with'},
    {key: 'endswith', display: 'Ends with'},
    {key: 'blank', display: 'Is Empty'},
  ];
  selectedStringFilterType = 'contains';

  constructor() { }

  ngOnInit(): void {
  }

  changeStringFilter(ev): void {
    if (ev.code === 'Enter') {
      this.createFilterObj();
    } else {
      this.filterApplied = false;
    }
  }

  createFilterObj(): void {
    if (this.filterParam) {
      const filterObj = { operator: this.selectedStringFilterType, value: this.filterParam };
      console.log(filterObj);
      this.filterApplied = true;
    }
  }

  removeFilter(): void {
    this.filterParam = '';
    this.selectedStringFilterType = 'contains';
    this.filterApplied = false;
  }

}
