import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Output() pageChanged: any = new EventEmitter<any>();

  @Input() noOfTotalRecords = 0;
  @Input() loadingData = true;
  recordsPerPage = 100;
  pages = 0;
  currentPage = 1;
  pagesOnDisplay = [];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.noOfTotalRecords) {
      console.log(changes.noOfTotalRecords);
      this.pages = Math.ceil(this.noOfTotalRecords / this.recordsPerPage);
      this.pageChange(this.currentPage);
    }

  }

  pageChange(pageNo): void {
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
    this.pageChanged.emit({pageNo: this.currentPage, recordsPerPage: this.recordsPerPage});
  }

  recordsPerPageChanged(): void {
    this.pageChange(1);
  }

}
