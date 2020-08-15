import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  numericFilterTypes = [
    {key: 'eq', display: 'Is equal to', selected: false},
    {key: 'neq', display: 'Is not equal to', selected: false},
    {key: 'greaterorequal', display: 'Is greater than or equal to', selected: false},
    {key: 'greaterthan', display: 'Is greater than', selected: false},
    {key: 'lessthanorequal', display: 'Is less than or equal to', selected: false},
    {key: 'lessthan', display: 'Is less than', selected: false}
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(filterType): void {
    console.log(filterType);
    this.filterParam = 'Filter Applied';
  }

  changeFilterOperator(): void {

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
    this.range.controls.start.setValue(null);
    this.range.controls.end.setValue(null);
    this.filterParam = '';
    this.filterApplied = false;
  }

  dateRangeChange(): void {
    const {start, end} = this.range.value;
    if (start && end) {
      this.filterParam = `${this.formatDate(start)}-${this.formatDate(end)}`;
      // this.filter.emit( {operator: 'between', value: this.filterParam} );
      console.log({operator: 'between', value: this.filterParam});
    }
  }

  private formatDate(date): void {
    try {
      if (date) {
        let month = (date.getMonth() + 1).toString();
        if (month.length === 1) {
          month = '0' +  month.toString();
        }
        let day = (date.getDate()).toString();
        if (day.length === 1) {
          day = '0' +  day.toString();
        }
        date = `${month}/${day}/${date.getFullYear()}`;
      }
      return date;
    } catch (e) {
      return date;
    }
  }

}
