import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponseModel } from './api-response.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  headings = [ {fieldName: 'uid', display: 'ID', type: 'number', minWidth: '160px', maxWidth: '160px', width: '12.25%', filter: true},
    {fieldName: 'first_name', display: 'First Name', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%'},
    {fieldName: 'email', display: 'Email', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%'},
    {fieldName: 'gender', display: 'Gender', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%',
      filterType: 'multi-select', other: { selectionMode: 'single', source: 'internal', url: 'gender', stringList: true}},
    {fieldName: 'date_of_birth', display: 'Date Of Birth', type: 'date-range', minWidth: '160px', maxWidth: '160px', width: '12.25%'},
    {fieldName: 'ip_address', display: 'IP Address', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%'},
    {fieldName: 'car', display: 'Car', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%'},
    {fieldName: 'phone', display: 'Phone', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%'},
    {fieldName: 'movie_taste', display: 'Movie Taste', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
    {fieldName: 'country', display: 'Country', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%',
      filterType: 'multi-select', other: { selectionMode: 'multiple', source: 'external', url: `countries`,
        key: 'displayName', value: 'value', stringList: true}, show: false},
    {fieldName: 'city', display: 'City', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
    {fieldName: 'company', display: 'Company', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
    {fieldName: 'iban', display: 'Iban', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
    {fieldName: 'latitude', display: 'Latitude', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
    {fieldName: 'longitude', display: 'Longitude', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
    {fieldName: 'currency', display: 'Currency', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
    {fieldName: 'username', display: 'Username', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
    {fieldName: 'profession', display: 'Profession', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
    {fieldName: 'state', display: 'State', type: 'string', minWidth: '160px', maxWidth: '160px', width: '12.25%', show: false},
  ];
  selection = true;
  allGridItemsSelected = false;
  loadingData = true;
  response = { gridData: [], totalCount: 0};
  moveRight = '0';
  selectionStarted = false;
  selectionTimeoutHandler: any;
  allCheckBoxesSelected = false;
  selectedRows = [];

  constructor(private http: HttpClient,
              private changeDetectorRef: ChangeDetectorRef,
              private renderer: Renderer2,
              public dialog: MatDialog) {
  }

  scrollChanged(ev): void {
   this.moveRight = '-' + ev.target.scrollLeft + 'px';
  }

  allGridItemsSelectionChanged(): void {
    this.selectedRows = [];
    this.response.gridData.forEach(item => {
      item.gridItemSelected = this.allGridItemsSelected;
      if (item.gridItemSelected) {
        this.selectedRows.push(item);
      }
    });
  }

  gridItemSelectionChanged(): void {
    this.selectedRows = [];
    this.response.gridData.forEach(item => {
      if (item.gridItemSelected) {
        this.selectedRows.push(item);
      }
    });
  }

  // Multiple Selection logic
  startSelect(item, element): void {
    this.selectionTimeoutHandler = setTimeout(() => {
      this.renderer.addClass(element, 'pulse');
      this.selectionStarted = true;
      item.gridItemSelected = true;
      this.selectionTimeoutHandler = null;

      setTimeout(() => {
        this.renderer.removeClass(element, 'pulse');
      }, 1000);
    }, 350);
  }

  endSelect(): void {
    clearInterval(this.selectionTimeoutHandler);
    if (this.selectionStarted) {
      this.selectionStarted = false;
      window.document.getSelection().removeAllRanges();
    }
  }

  overSelect($event, item): void {
    if (this.selectionStarted) {
      item.gridItemSelected = true;
      this.getSelection();
    }
  }

  getSelection(): void {
    this.selectedRows = [];
    this.allCheckBoxesSelected = true;
    for (let i = 0, len = this.response.gridData.length; i < len; i++) {
      if (this.response.gridData[i].gridItemSelected === true) {
        this.selectedRows.push(this.response.gridData[i]);
      } else {
        this.allCheckBoxesSelected = false;
      }
    }
    // this.selectionEmit.emit(this.selectedRows);
    // this.selectAllState = false;
  }

  // page change event
  pageChanged({pageNo, recordsPerPage}): void {
    this.loadingData = true;
    const url = 'https://angular-grid.herokuapp.com/getUsers';
    const body = {
      entity: {},
      page: pageNo,
      perPage: recordsPerPage
    };
    console.log(body);

    this.http.post<ApiResponseModel>(url, body).subscribe(data => {
      this.selectedRows = [];
      this.response = data.payload;
      console.log(this.response.gridData);
      this.loadingData = false;
      this.changeDetectorRef.detectChanges();
      document.getElementById('scrollViewport').scrollTop = 0;
    });
  }
}
