import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'amdg-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Output() pageChanged: any = new EventEmitter<any>();
  @Output() toggleFullScreen: any = new EventEmitter<any>();

  @Input() noOfTotalRecords = 0;
  @Input() loadingData = true;
  @Input() noOfRecords = 0;
  @Input() noOfSelectedRow = 0;
  @Input() currentPage = 1;
  @Input() showToggleFullScreen = true;
  @Input() showNoOfRecords = true;
  recordsPerPage = 100;
  newRecordsPerPage = 100;
  pages = 0;
  // currentPage = 1;
  pagesOnDisplay = [];
  pageInfoDisplayText = '';
  discardSelectionConfirmationObj = {
    width: '300px',
    data: {
      title: 'Discard Selection?',
      content: 'If you leave this page your selection will get discarded, do you want to proceed anyway?',
      ok_text: 'PROCEED',
      cancel_text: 'CANCEL'
    }
  } as const;
  fullscreen = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.pageChanged.emit({pageNo: 1, recordsPerPage: this.recordsPerPage}); // initial request trigger
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadingData?.currentValue === false) { // render pages buttons when data is loaded
      if (this.newRecordsPerPage !== this.recordsPerPage) { // if page size changes go back to page 1
        this.recordsPerPage = this.newRecordsPerPage;
        this.currentPage = 1;
      }
      this.pageChange(this.currentPage, false); // render page buttons without an emit to parent
    }
  }

  pageChange(pageNo, notify = true): void {
    if (this.noOfSelectedRow > 0) {
      this.dialog.open(ConfirmationComponent, this.discardSelectionConfirmationObj).afterClosed().subscribe(result => {
        if (result) {
          this.continuePageChange(pageNo, notify);
        }
      });
    } else {
      this.continuePageChange(pageNo, notify);
    }

  }

  continuePageChange(pageNo, notify = true): void {
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
    this.pageInfoDisplayText = `${(this.recordsPerPage * this.currentPage) - this.recordsPerPage + 1} - ${this.currentPage === this.pages ? this.noOfTotalRecords : this.newRecordsPerPage * this.currentPage} of ${this.noOfTotalRecords} items`;
    if (this.noOfTotalRecords === 0) {
      this.pageInfoDisplayText = '0 items';
    }
    if (notify) {
      this.pageChanged.emit({pageNo: this.currentPage, recordsPerPage: this.recordsPerPage});
    }
  }

  recordsPerPageChanged(): void {
    if (this.noOfSelectedRow > 0) {
      this.dialog.open(ConfirmationComponent, this.discardSelectionConfirmationObj).afterClosed().subscribe(result => {
        if (result) {
          this.pageChanged.emit({pageNo: 1, recordsPerPage: this.newRecordsPerPage});
        }
      });
    } else {
      this.pageChanged.emit({pageNo: 1, recordsPerPage: this.newRecordsPerPage});
    }
  }

}
