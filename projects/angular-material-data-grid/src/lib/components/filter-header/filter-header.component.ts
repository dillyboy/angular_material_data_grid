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
  @Output() filter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  filterObjCreated(ev): void {
    this.filter.emit({field: this.heading.fieldName, ...ev});
  }

}
