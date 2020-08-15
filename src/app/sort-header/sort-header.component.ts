import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent {

  @Input() heading: any = { display: null, type: 'string', sort: '', disableSorting: false};
  @Output() filter = new EventEmitter();
  constructor() { }

  sort(): void {
    if (!this.heading.disableSorting) {
      switch (this.heading.sort) {
        case 'asc':
          this.heading.sort = 'desc';
          break;
        case 'desc':
          this.heading.sort = null;
          break;
        default:
          this.heading.sort = 'asc';
      }

      this.filter.emit(this.heading);
    }

  }

}
