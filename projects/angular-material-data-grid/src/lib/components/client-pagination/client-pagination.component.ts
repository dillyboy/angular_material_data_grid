import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'amdg-client-pagination',
  templateUrl: './client-pagination.component.html',
  styleUrls: ['../pagination/pagination.component.scss']
})
export class ClientPaginationComponent implements OnInit, OnChanges {

  @Input() noOfTotalRecords = null;
  @Input() noOfSelectedRow = null;
  @Input() currentPage = 1;
  @Input() loadingData = true;
  @Output() toggleFullScreen: any = new EventEmitter<any>();
  @Output() pageChanged: any = new EventEmitter<any>();

  pageInfoDisplayText = '';
  fullscreen = false;
  pages = 0;
  recordsPerPage = 100;
  pagesOnDisplay = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadingData?.currentValue === false) { // render pages buttons when data is loaded
      this.pageChange(this.currentPage, false); // render page buttons without an emit to parent
    }
  }

  pageChange(pageNo, notify = true): void {
    this.pages = Math.ceil(this.noOfTotalRecords / this.recordsPerPage);
    this.currentPage = pageNo;
    this.pagesOnDisplay = [];

    if (this.pages > 5) {
      if (pageNo <= 3) {
        for (let i = 1; i <= 5; i++) {
          this.pagesOnDisplay.push(i);
        }
      } else if (pageNo > 3 && pageNo < this.pages - 2) {
        for (let i = 1; i < 5 + 1; i++) {
          this.pagesOnDisplay.push(i + pageNo - 3);
        }
      } else {
        for (let i = 1; i < 5 + 1; i++) {
          this.pagesOnDisplay.push(i + this.pages - 5);
        }
      }
    } else {
      for (let i = 1; i < this.pages + 1; i++) {
        this.pagesOnDisplay.push(i);
      }
    }
    this.pageInfoDisplayText = `${ (this.recordsPerPage * this.currentPage) - this.recordsPerPage + 1} - ${this.currentPage === this.pages ? this.noOfTotalRecords : this.recordsPerPage * this.currentPage} of ${this.noOfTotalRecords} items`;
    if (this.noOfTotalRecords === 0) {
      this.pageInfoDisplayText = '0 items';
    }
    if (notify) {
      this.pageChanged.emit({pageNo: this.currentPage, recordsPerPage: this.recordsPerPage});
    }
  }

}
