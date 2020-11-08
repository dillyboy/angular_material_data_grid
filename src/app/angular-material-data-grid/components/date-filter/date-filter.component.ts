import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent {

  @Output() filter: any = new EventEmitter<any>();
  filterParam = '';
  filterApplied = false;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() { }

  applyFilter(filterType): void {
    console.log(filterType);
    this.filterParam = 'Filter Applied';
    this.filter.emit( {operator: 'between', value: filterType} );
    this.filterApplied = true;
  }

  removeFilter(): void {
    this.range.controls.start.setValue(null);
    this.range.controls.end.setValue(null);
    this.filterParam = '';
    this.filter.emit( {operator: 'between', value: null} );
    this.filterApplied = false;
  }

  dateRangeChange(): void {
    const {start, end} = this.range.value;
    if (start && end) {
      this.filterParam = `${this.formatDate(start)}-${this.formatDate(end)}`;
      this.filter.emit( {operator: 'between', value: this.filterParam} );
      this.filterApplied = true;
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
