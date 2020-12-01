import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  Renderer2,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiResponseModel } from './api-response.model';
import GridResponseInterface from './interfaces/grid-response';
import GridHeadingInterface from './interfaces/grid-heading-type';
import GridFilterItemInterface from './interfaces/grid-filter-item';
import GirdButtonClickInterface from './interfaces/gird-button-click-interface';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-angular-material-data-grid',
  templateUrl: './angular-material-data-grid.component.html',
  styleUrls: ['./angular-material-data-grid.component.scss']
})
export class AngularMaterialDataGridComponent implements AfterViewInit, OnChanges {

  @Output() responseEmit: any = new EventEmitter<GridResponseInterface>();
  @Output() selectionEmit: any = new EventEmitter<any[]>();
  @Output() filtersChangedEmit: any = new EventEmitter<GridFilterItemInterface[]>();
  @Output() buttonClickEmit: any = new EventEmitter<GirdButtonClickInterface>();

  @Input() headings: GridHeadingInterface[] = [];
  @Input() url = '';
  @Input() selection = false;
  @Input() columnControl = false;
  @Input() entity = null;
  @Input() transparency = false;

  allGridItemsSelected = false;
  loadingData = false;
  response: GridResponseInterface = { gridData: [], totalCount: 0};
  recordsPerPage = 100;
  selectionStarted = false;
  selectionTimeoutHandler: any;
  allCheckBoxesSelected = false;
  selectedRows = [];
  gridWidth = null;
  offsetTop = null;
  scrollRemainingDistanceToLeft = 0;
  scrollRemainingDistanceToRight = null;
  horizontalScrollBarWidth = null;
  currentPage = 1;
  sortObj = {
    sort: null,
    sortField: null
  };
  filters = [];

  fullscreen = false;

  @ViewChild('gridContainer') gridContainer: ElementRef;
  @ViewChild('cdkVirtualScrollViewport') cdkVirtualScrollViewport: CdkVirtualScrollViewport;

  // Window resize listener
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.calculateGridWidth();
  }

  constructor(private http: HttpClient,
              private changeDetectorRef: ChangeDetectorRef,
              private renderer: Renderer2,
              public dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateGridWidth();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity?.currentValue || changes.headings?.currentValue) {
      this.pageChanged({pageNo: 1, recordsPerPage: this.recordsPerPage});
    }
  }

  private calculateGridWidth(): void {
    const gridContainer = this.gridContainer.nativeElement;
    const {offsetWidth, clientWidth} = this.cdkVirtualScrollViewport.elementRef.nativeElement;
    this.horizontalScrollBarWidth = offsetWidth - clientWidth + 'px';
    console.log(this.horizontalScrollBarWidth);
    this.gridWidth = gridContainer.clientWidth;
    const heightOfHeaderAndFooter = 114;
    const heightToTop = this.fullscreen ? 0 : gridContainer.getBoundingClientRect().top;
    const otherOffset = this.fullscreen ? 0 : gridContainer.offsetTop;
    let totalOffset = heightOfHeaderAndFooter + heightToTop + otherOffset;
    if (this.columnControl && !this.fullscreen) {
      totalOffset += 24; // heightOfColumnControlBtn
    }
    this.offsetTop = totalOffset;
    this.changeDetectorRef.detectChanges();
  }

  scrollLeft(): void {
    const scrollLeft = document.getElementById('scrollViewport').scrollLeft;
    document.getElementById('scrollViewport').scrollLeft = scrollLeft - this.gridWidth * 80 / 100;
  }

  scrollRight(): void {
    const scrollLeft = document.getElementById('scrollViewport').scrollLeft;
    document.getElementById('scrollViewport').scrollLeft = this.gridWidth * 80 / 100 + scrollLeft;
  }

  scrollChanged(ev?): void {
    let elem = null;
    if (ev) {
      elem = ev.target;
    } else {
      elem = document.getElementById('scrollViewport') as HTMLElement;
    }
    this.scrollRemainingDistanceToLeft = elem.scrollLeft;
    this.scrollRemainingDistanceToRight = elem.scrollWidth - elem.scrollLeft - this.gridWidth;
  }

  updateColumns(): void {
    this.headings = [...this.headings]; // to run change detection in the virtual scroll need to reassign a fresh copy
    setTimeout(() => {
      this.scrollChanged(); // this is done to recalculate scrollRemainingDistanceToLeft & scrollRemainingDistanceToRight
                            // values which helps to show the auto scroll navigate buttons
      this.changeDetectorRef.detectChanges();
    }, 100);
  }

  columnDrop(ev): void {
    moveItemInArray(this.headings, ev.previousIndex, ev.currentIndex);
    this.updateColumns();
  }

  sort(ev): void {
    let index = null;
    this.headings.forEach((heading: any, i) => {
      if (heading.fieldName === ev.fieldName) {
        index = i;
      } else {
        heading.sort = null;
      }
    });
    const sortObj = {
      sort: this.headings[index]?.sort,
      sortField: this.headings[index]?.sort ? this.headings[index]?.fieldName : null
    };
    this.sortObj = sortObj;
    this.pageChanged({pageNo: 1, recordsPerPage: this.recordsPerPage});
  }

  filter(ev): void {
    let filterIndex = null;
    this.filters.forEach((filter, i) => {
      if (filter.field === ev.field) {
        filterIndex = i;
      }
    });
    if (filterIndex !== null) {
      if (ev.value) {
        this.filters[filterIndex] = ev;
      } else {
        this.filters.splice(filterIndex, 1);
      }
    } else {
      if (ev.value) {
        this.filters.push(ev);
      }
    }
    this.filtersChangedEmit.emit(this.filters);
    this.pageChanged({pageNo: 1, recordsPerPage: this.recordsPerPage});
  }

  gridItemSelectionChanged(all = false): void {
    this.selectedRows = [];
    this.response.gridData.forEach(item => {
      if (all) {
        item.gridItemSelected = this.allGridItemsSelected;
      }
      if (item.gridItemSelected) {
        this.selectedRows.push(item);
      }
    });
    this.selectionEmit.emit(this.selectedRows);
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
    this.selectionEmit.emit(this.selectedRows);
    // this.selectAllState = false;
  }

  // page change event
  pageChanged({pageNo, recordsPerPage}): void {
    this.recordsPerPage = recordsPerPage;
    this.loadingData = true;
    this.currentPage = pageNo;
    this.changeDetectorRef.detectChanges();

    // const url = './assets/data.json';
    const body = {
      entity: this.entity,
      page: this.currentPage,
      perPage: recordsPerPage,
      filters: this.filters,
      ...this.sortObj
    };
    console.log(body);

    this.http.post<ApiResponseModel>(this.url, body).subscribe(data => {

      const gridData = this.linkCreationInterceptor(data.payload.gridData);
      this.selectedRows = [];
      this.response = {gridData, totalCount: data.payload.totalCount};
      this.responseEmit.emit(this.response);
      this.loadingData = false;
      this.changeDetectorRef.detectChanges();
      document.getElementById('scrollViewport').scrollTop = 0;
    });
  }

  private linkCreationInterceptor(gridData): any[] {

    const urlHeadings = [];
    this.headings.forEach(heading => {
      if (heading.type === 'url') {
        urlHeadings.push({
          type: heading.fieldName,
          urlTemplate: heading.other?.urlTemplate,
          queryParams: heading.other?.queryParams,
          source: heading.other?.source,
        });
      }
    });

    const items = gridData.map(item => {
      const obj = {};
      urlHeadings.forEach(heading => {
        const splitUrl = heading.urlTemplate.split('/');
        const newUrl = [];
        splitUrl.forEach(urlItem => {
          if (urlItem.includes(':')) {
            urlItem = item[urlItem.substring(1)];
          }
          newUrl.push(urlItem);
        });
        obj[heading.type + 'Link'] = newUrl.join('/');
        if (heading.queryParams) {
          let objParams = null;
          if (heading.source === 'external') {
            objParams = '';
            Object.keys(heading.queryParams).forEach(field => {
              objParams += field + '=' + item[heading.queryParams[field]] + '&';
            });
            objParams = objParams.slice(0, -1);
          } else {
            objParams = {};
            Object.keys(heading.queryParams).forEach(field => {
              objParams[field] = item[heading.queryParams[field]];
            });
          }

          obj[heading.type + 'QueryParams'] = objParams;
        }
      });
      return {...item, ...obj};
    });
    return items;
  }

  toggleFullScreen(ev): void {
    this.fullscreen = ev;
    setTimeout(() => { // wait until dom adjusts
      this.calculateGridWidth();
    });
  }

  openLinkInNewTab(link, params = {}): void {
    let paramString = '?';
    // if (isEmpty(params)) {
    //   paramString = '';
    // }
    Object.keys(params).forEach(key => {
      paramString += key + '=' + params[key];
    });
    window.open(link + paramString);
  }

  openExternalLinkInNewTab(link, params): void {
    if (params) {
      window.open(link + '?' + params);
    } else {
      window.open(link);
    }
  }

  goToLink(fieldName, item, click?): void {
    this.buttonClickEmit.emit({fieldName, item, click});
  }
}
