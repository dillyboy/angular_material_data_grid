import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-header',
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
    console.log({field: this.heading.display, ...ev});
  }

}
