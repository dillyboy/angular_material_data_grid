import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'amdg-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.scss']
})
export class FilterHeaderComponent implements OnInit {

  @Input() heading: any = {
    display: null,
    type: 'string',
    sort: '',
    filterType: null,
    disableSorting: false,
    disableFiltering: false,
    other: {}
  };
  @Input() initialFilters: any = [];
  @Input() resetFilters = null;
  @Output() filter = new EventEmitter();

  initialFilter = null;

  constructor() { }

  ngOnInit(): void {
    const i = this.initialFilters.findIndex(filter => filter.field === this.heading.fieldName);
    if (i !== -1) {
      this.initialFilter = this.initialFilters[i];
    }
  }

  filterObjCreated(ev): void {
    this.filter.emit({field: this.heading.fieldName, ...ev});
  }

}
