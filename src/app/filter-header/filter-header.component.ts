import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.scss']
})
export class FilterHeaderComponent implements OnInit {

  @Input() heading: any = { display: null, type: 'string', sort: '', disableSorting: false};
  @Output() filter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
