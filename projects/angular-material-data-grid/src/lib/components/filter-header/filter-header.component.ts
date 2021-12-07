import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import GridFilterItemInterface from '../../interfaces/grid-filter-item';

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
  @Input() initialFilters: GridFilterItemInterface[] = [];
  @Input() resetFilters = null;
  @Output() filter = new EventEmitter();

  initialFilter?: GridFilterItemInterface;

  constructor() { }

  ngOnInit(): void {
    const i = this.initialFilters.findIndex((filter: GridFilterItemInterface) => filter.field === this.heading.fieldName);
    if (i !== -1) {
      this.initialFilter = this.initialFilters[i];
    }
  }

  filterObjCreated(ev: GridFilterItemInterface): void {
    this.filter.emit({field: this.heading.fieldName, operator: ev.operator, value: ev.value});
  }

}
