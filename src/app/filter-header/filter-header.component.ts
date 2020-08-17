import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.scss']
})
export class FilterHeaderComponent implements OnInit {

  @Input() heading: any = { display: null, type: 'string', sort: '', filterType: null, disableSorting: false, disableFiltering: false};
  @Output() filter = new EventEmitter();
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
      const filterObj = {fieldName: this.heading.fieldName, operator: this.selectedStringFilterType, value: this.filterParam};
      console.log(filterObj);
      this.filterApplied = true;
    }
  }

  removeFilter(): void {
    this.filterParam = '';
    this.filterApplied = false;
  }

  filterObjCreated(ev): void {
    console.log(ev);
  }

}
