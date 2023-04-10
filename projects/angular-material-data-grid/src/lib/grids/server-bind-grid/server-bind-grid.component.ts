import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import GridRequestInterface from '../../interfaces/grid-request';
import GridResponseInterface from '../../interfaces/grid-response';
import GridFilterItemInterface from '../../interfaces/grid-filter-item';
import GridSortItemInterface from '../../interfaces/grid-sort-item';
import GridButtonClickInterface from '../../interfaces/grid-button-click-interface';
import GridHeadingInterface from '../../interfaces/grid-heading-type';
import GridMasterDetailConfigInterface from '../../interfaces/grid-master-detail-config-type';
import {
  CdkVirtualScrollViewport,
  FixedSizeVirtualScrollStrategy,
  VIRTUAL_SCROLL_STRATEGY,
} from '@angular/cdk/scrolling';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GridService } from '../grid.service';
import { GridFilterItem } from '../../angular-material-data-grid-interfaces';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(20, 400, 400);
  }
}

@Component({
  selector: 'amdg-grid',
  templateUrl: './server-bind-grid.component.html',
  styleUrls: [
    './server-bind-grid.component.scss',
    '../../angular-material-data-grid-utilities.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy },
  ],
})
export class ServerBindGridComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Output() requestBodyEmit: any = new EventEmitter<GridRequestInterface>();
  @Output() responseEmit: any = new EventEmitter<GridResponseInterface>();
  @Output() selectionEmit: any = new EventEmitter<any[]>();
  @Output() filtersChangedEmit: any = new EventEmitter<
    GridFilterItemInterface[]
  >();
  @Output() sortChangedEmit: any = new EventEmitter<GridSortItemInterface>();
  @Output() buttonClickEmit: any = new EventEmitter<GridButtonClickInterface>();
  @Output() columnPreferencesChangedEmit: any = new EventEmitter<
    GridHeadingInterface[]
  >();
  @Output() columnPreferencesChangeEndedEmit: any = new EventEmitter<
    GridHeadingInterface[]
  >();
  @Output() columnPreferencesResetEmit: any = new EventEmitter();
  @Output() dataErrorEmit: any = new EventEmitter();

  @Input() headings: GridHeadingInterface[] = [];
  @Input() url = '';
  @Input() selection = false;
  @Input() columnControl = false;
  @Input() entity = null;
  @Input() transparency = false;
  @Input() elevation:
    | 0
    | 1
    | 2
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24 = 2;
  @Input() serverSidePagination = false;
  @Input() initialFilters: GridFilterItem[] = [];
  @Input() resetFilters = null;
  @Input() expandable = false;
  @Input() expandableConfig: GridMasterDetailConfigInterface = {
    type: 'html',
    multipleExpansion: false,
    template: '<p>Pass the expandableConfig object into the grid</p>',
    childGrid: {
      headings: [],
      url: '',
      entity: {},
      serverSidePagination: false,
    },
  };
  @Input() disableFullScreenToggle = false;
  @Input() pageSizes: number[] = [50, 100, 250, 500, 1000];
  @Input() pageSize: number = 100;
  // To let the grid know that the data is local and not to make a request
  @Input() local?: boolean = false;
  // To pass the local data to the grid
  @Input() localData?: GridResponseInterface;
  // Call the method to update the data in the grid onDemand
  @Input() updateData?: Subject<GridResponseInterface>;

  headingsCopy = [];
  columnSearchParam = '';
  allGridItemsSelected = false;
  loadingData = false;
  response: GridResponseInterface = { gridData: [], totalCount: 0 };
  responseBackup: GridResponseInterface = { gridData: [], totalCount: 0 };
  gridItems: any[] = [];
  selectionStarted = false;
  selectionTimeoutHandler: any;
  allCheckBoxesSelected = false;
  selectedRows: any[] = [];
  gridWidth = 0;
  offsetTop = 0;
  scrollRemainingDistanceToLeft = 0;
  scrollRemainingDistanceToRight = 0;
  horizontalScrollBarWidth = 0;
  currentPage = 1;
  sortObj: GridSortItemInterface = {
    sort: null,
    sortField: null,
  };
  filters: GridFilterItemInterface[] = [];
  gridPostSubscription: Subscription = new Subscription();

  fullscreen = false;
  allRowsExpanded = false;

  @ViewChild('gridContainer') gridContainer!: ElementRef;
  @ViewChild('cdkVirtualScrollViewport')
  cdkVirtualScrollViewport!: CdkVirtualScrollViewport;

  // Window resize listener
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.calculateGridWidth();
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private ngZone: NgZone,
    private gridService: GridService
  ) {}

  ngOnInit(): void {
    this.headingsCopy = JSON.parse(JSON.stringify(this.headings));
    this.updateData?.subscribe((data) => {
      this.updateGridData(data);
    });
  }

  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.updateData?.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateGridWidth();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entity']?.currentValue || changes['headings']?.currentValue) {
      if (changes['initialFilters']?.firstChange) {
        this.filters = this.initialFilters;
      }
      this.getData({ pageNo: 1, recordsPerPage: this.pageSize });
    }

    // To allow the grid to be refreshed with new local data onDemand
    if (changes['localData']?.currentValue) {
      if (this.local) {
        if (this.localData) {
          this.response = {
            gridData: this.localData.gridData,
            totalCount: this.localData.totalCount,
            other: this.localData.other,
          };
          this.responseBackup = {
            gridData: this.localData.gridData,
            totalCount: this.localData.totalCount,
            other: this.localData.other,
          };
          this.pageChanged({ pageNo: 1, recordsPerPage: this.pageSize });
        }
      }
    }

    if (changes['headings']?.currentValue) {
      this.updateColumns();
    }

    if (changes['resetFilters']?.currentValue) {
      this.filters = [];
      if (this.serverSidePagination) {
        this.getData({ pageNo: 1, recordsPerPage: this.pageSize });
      } else {
        this.response = JSON.parse(JSON.stringify(this.responseBackup));
        this.pageChanged({ pageNo: 1, recordsPerPage: this.pageSize });
      }
    }

    if (
      changes['pageSizes']?.currentValue ||
      changes['pageSize']?.currentValue
    ) {
      if (this.pageSizes.length === 0) {
        console.error(
          '@Input() pageSizes array should have at least one page size'
        );
        this.pageSizes = [100];
      }
      if (!this.pageSizes.includes(this.pageSize)) {
        this.pageSize = this.pageSizes[0];
        console.error(
          '@Input() pageSize does not exist on the @Input() pagesSizes array'
        );
      }
    }
  }

  private calculateGridWidth(): void {
    const gridContainer = this.gridContainer.nativeElement;
    const { offsetWidth, clientWidth } =
      this.cdkVirtualScrollViewport.elementRef.nativeElement;
    this.horizontalScrollBarWidth = offsetWidth - clientWidth;
    this.gridWidth = offsetWidth;
    const heightOfHeaderAndFooter = 114;
    const heightToTop = this.fullscreen
      ? 0
      : gridContainer.getBoundingClientRect().top;
    const otherOffset = this.fullscreen ? 0 : 24;
    const totalOffset = heightOfHeaderAndFooter + heightToTop + otherOffset;
    // if (this.columnControl && !this.fullscreen) {
    // totalOffset += 24; // heightOfColumnControlBtn
    // }
    this.offsetTop = totalOffset;
    this.scrollChanged();
    this.changeDetectorRef.detectChanges();
  }

  scrollLeft(): void {
    const scrollLeft =
      this.cdkVirtualScrollViewport.elementRef.nativeElement.scrollLeft;
    this.cdkVirtualScrollViewport.elementRef.nativeElement.scrollLeft =
      scrollLeft - (this.gridWidth * 80) / 100;
  }

  scrollRight(): void {
    const scrollLeft =
      this.cdkVirtualScrollViewport.elementRef.nativeElement.scrollLeft;
    this.cdkVirtualScrollViewport.elementRef.nativeElement.scrollLeft =
      (this.gridWidth * 80) / 100 + scrollLeft;
  }

  scrollChanged(ev?: Event): void {
    let elem: any = null;
    if (ev) {
      elem = ev.target;
    } else {
      elem = this.cdkVirtualScrollViewport.elementRef
        .nativeElement as HTMLElement;
    }
    this.scrollRemainingDistanceToLeft = elem.scrollLeft;
    this.scrollRemainingDistanceToRight = Math.trunc(
      elem.scrollWidth -
        elem.scrollLeft -
        this.gridWidth +
        this.horizontalScrollBarWidth
    );
  }

  updateColumns(columnPreferenceChangeEnded = false): void {
    this.headings = [...this.headings]; // to run change detection in the virtual scroll need to reassign a fresh copy
    setTimeout(() => {
      this.scrollChanged(); // this is done to recalculate scrollRemainingDistanceToLeft & scrollRemainingDistanceToRight
      // values which helps to show the auto scroll navigate buttons
      this.changeDetectorRef.detectChanges();
      if (columnPreferenceChangeEnded) {
        // only emit if there is an actual change to the headings array
        if (
          JSON.stringify(this.headings) !== JSON.stringify(this.headingsCopy)
        ) {
          this.columnPreferencesChangeEndedEmit.emit(this.headings);
          this.headingsCopy = JSON.parse(JSON.stringify(this.headings));
        }
      } else {
        this.columnPreferencesChangedEmit.emit(this.headings);
      }
    }, 100);
  }

  columnDrop(ev: CdkDragDrop<any>): void {
    moveItemInArray(this.headings, ev.previousIndex, ev.currentIndex);
    this.updateColumns();
  }

  sort(ev: GridHeadingInterface): void {
    let index = 0;
    this.headings.forEach((heading: any, i) => {
      if (heading.fieldName === ev.fieldName) {
        index = i;
      } else {
        heading.sort = null;
      }
    });
    const sortObj: GridSortItemInterface = {
      sort: this.headings[index]?.sort,
      sortField: this.headings[index]?.sort
        ? this.headings[index]?.fieldName
        : null,
    };
    this.sortObj = sortObj;
    this.sortChangedEmit.emit(sortObj);
    if (this.serverSidePagination) {
      this.getData({ pageNo: 1, recordsPerPage: this.pageSize });
    } else {
      this.pageChanged({ pageNo: 1, recordsPerPage: this.pageSize });
    }
  }

  filter(ev: GridFilterItemInterface): void {
    let filterIndex = null;
    this.filters.forEach((filter, i) => {
      if (filter.field === ev.field) {
        filterIndex = i;
      }
    });
    if (filterIndex !== null) {
      if (ev.value || ev.value === '') {
        this.filters[filterIndex] = ev;
      } else {
        this.filters.splice(filterIndex, 1);
      }
    } else {
      if (ev.value || ev.value === '') {
        this.filters.push(ev);
      }
    }
    this.filtersChangedEmit.emit(this.filters);

    if (this.serverSidePagination === false) {
      this.ngZone.runOutsideAngular(() => {
        const operators: any = {
          between: (field: string, range: string) => {
            const [min, max] = range.split('-').map(Number);
            return min <= parseInt(field, 10) && parseInt(field, 10) <= max;
          },
          betweendates: (field: string, range: string) => {
            const [min, max] = range.split('-');
            return (
              new Date(min) <= new Date(field) &&
              new Date(field) <= new Date(max)
            );
          },
          eq: (field: string, value: string) => {
            if (value.includes(',') || field.includes(',')) {
              // return value.split(',').includes(field);
              return value
                .split(',')
                .some((item) => field.split(',').includes(item));
            } else {
              return field === value;
            }
          },
          neq: (field: string, value: string) => field !== value,
          greaterorequal: (field: string, value: string) => field >= value,
          greaterthan: (field: string, value: string) => field > value,
          lessthanorequal: (field: string, value: string) => field <= value,
          lessthan: (field: string, value: string) => field < value,
          contains: (field: string, value: string) => field.includes(value),
          startswith: (field: string, value: string) => field.startsWith(value),
          endswith: (field: string, value: string) => field.endsWith(value),
          blank: (field: string) => !field,
        };

        const result = this.responseBackup.gridData.filter((o) =>
          this.filters.every(({ field, operator, value }) => {
            return operators[operator](
              makeSearchFriendly(o[field]),
              makeSearchFriendly(value)
            );
          })
        );

        function makeSearchFriendly(searchTerm: any): string {
          let searchableString = searchTerm ? searchTerm : '';
          return searchableString.toString().toLowerCase().trim();
        }

        this.ngZone.run(() => {
          this.response.gridData = result;
        });
      });
      this.pageChanged({ pageNo: 1, recordsPerPage: this.pageSize });
    } else {
      this.getData({ pageNo: 1, recordsPerPage: this.pageSize });
    }
  }

  gridItemSelectionChanged(all = false): void {
    this.selectedRows = [];
    this.gridItems.forEach((item: any) => {
      if (all) {
        item.gridItemSelected = this.allGridItemsSelected;
      }
      if (item.gridItemSelected) {
        this.selectedRows.push(item);
      }
    });
    this.allGridItemsSelected =
      this.selectedRows.length === this.gridItems.length;
    this.selectionEmit.emit(this.selectedRows);
  }

  // Multiple Selection logic
  startSelect(item: any, element: HTMLElement): void {
    this.selectionTimeoutHandler = setTimeout(() => {
      this.renderer.addClass(element, 'amdg-pulse');
      this.selectionStarted = true;
      item.gridItemSelected = true;
      this.selectionTimeoutHandler = null;

      setTimeout(() => {
        this.renderer.removeClass(element, 'amdg-pulse');
      }, 1000);
    }, 350);
  }

  endSelect(): void {
    clearInterval(this.selectionTimeoutHandler);
    if (this.selectionStarted) {
      this.selectionStarted = false;
      window.document.getSelection()!.removeAllRanges();
    }
  }

  overSelect($event: MouseEvent, item: any): void {
    if (this.selectionStarted) {
      item.gridItemSelected = true;
      this.getSelection();
    }
  }

  toggleAllRowsExpansion(): void {
    if (this.loadingData === false) {
      // do not allow to toggle when data is loading
      this.allRowsExpanded = !this.allRowsExpanded;
      this.gridItems.forEach((item) => {
        if (item.gridItemExpanded === undefined) {
          item.gridItemExpanded = true;
        } else {
          item.gridItemExpanded = !item.gridItemExpanded;
        }
      });
    }
  }

  clickRow($event: any, item: any, index: number): void {
    if (this.expandableConfig.multipleExpansion === false) {
      this.gridItems.forEach((eachItem, itemIndex) => {
        if (itemIndex !== index) {
          eachItem.gridItemExpanded = false;
        }
      });
    }

    if (item.gridItemExpanded === undefined) {
      item.gridItemExpanded = true;
    } else {
      item.gridItemExpanded = !item.gridItemExpanded;
    }
  }

  getSelection(): void {
    this.selectedRows = [];
    this.allCheckBoxesSelected = true;
    for (let i = 0, len = this.gridItems.length; i < len; i++) {
      if (this.gridItems[i].gridItemSelected === true) {
        this.selectedRows.push(this.gridItems[i]);
      } else {
        this.allCheckBoxesSelected = false;
      }
    }
    this.allGridItemsSelected =
      this.selectedRows.length === this.gridItems.length;
    this.selectionEmit.emit(this.selectedRows);
  }

  // page change event
  getData({ pageNo, recordsPerPage }: any): void {
    if (this.gridPostSubscription) {
      this.gridPostSubscription.unsubscribe();
      this.gridPostSubscription = new Subscription();
    }

    this.pageSize = recordsPerPage;
    this.loadingData = true;
    this.currentPage = pageNo;
    this.changeDetectorRef.detectChanges();

    // added for local data
    if (this.local) {
      if (this.localData) {
        this.allGridItemsSelected = false;
        this.selectedRows = [];
        this.response = {
          gridData: this.localData.gridData,
          totalCount: this.localData.totalCount,
          other: this.localData.other,
        };
        this.responseBackup = {
          gridData: this.localData.gridData,
          totalCount: this.localData.totalCount,
          other: this.localData.other,
        };
        this.gridItems = this.localData.gridData;
        this.responseEmit.emit(this.response);
        this.selectionEmit.emit(this.selectedRows);
        this.loadingData = false;
        this.changeDetectorRef.detectChanges();
        this.pageChanged({
          pageNo: this.currentPage,
          recordsPerPage: this.pageSize,
        });
        this.initialFilters.forEach((filter) => {
          this.filter(filter);
        });
        return;
      }
      this.dataErrorEmit.emit('No data found');
      return;
    }

    let body: GridRequestInterface;
    if (this.serverSidePagination) {
      body = {
        entity: this.entity,
        page: this.currentPage,
        perPage: recordsPerPage,
        filters: this.filters,
        ...this.sortObj,
      };
    } else {
      body = {
        entity: this.entity,
      };
    }

    this.requestBodyEmit.emit(body);

    this.gridPostSubscription = this.gridService
      .getAnyPost(this.url, body)
      .subscribe(
        (data) => {
          if (data.statusCode === 200 || data.success) {
            const gridData = this.linkCreationInterceptor(
              data.payload.gridData
            );
            const { totalCount, other } = data.payload;
            this.allGridItemsSelected = false;
            this.selectedRows = [];
            this.response = { gridData, totalCount, other };
            this.responseBackup = { gridData, totalCount, other };
            this.gridItems = gridData;
            this.responseEmit.emit(this.response);
            this.selectionEmit.emit(this.selectedRows);
            if (this.serverSidePagination) {
              this.loadingData = false;
              this.changeDetectorRef.detectChanges();
              this.cdkVirtualScrollViewport.elementRef.nativeElement.scrollTop = 0;
              setTimeout(() => {
                this.calculateGridWidth();
              }, 100);
            } else {
              this.pageChanged({
                pageNo: this.currentPage,
                recordsPerPage: this.pageSize,
              });
              this.initialFilters.forEach((filter) => {
                this.filter(filter);
              });
            }
          } else {
            this.dataErrorEmit.emit(data);
          }
        },
        (error) => {
          this.dataErrorEmit.emit(error);
        }
      );
  }

  private sortAscending(sortField: string): any {
    let sortOrder = 1;
    if (sortField[0] === '-') {
      sortOrder = -1;
      sortField = sortField.substr(1);
    }
    return (a: any, b: any) => {
      const result =
        a[sortField] < b[sortField] ? -1 : a[sortField] > b[sortField] ? 1 : 0;
      return result * sortOrder;
    };
  }

  pageChanged({ pageNo, recordsPerPage }: any): void {
    // only applicable to client side pagination
    this.loadingData = true;
    this.allGridItemsSelected = false;
    this.selectedRows = [];
    this.selectionEmit.emit(this.selectedRows);
    this.changeDetectorRef.detectChanges();
    this.pageSize = recordsPerPage;
    this.currentPage = pageNo;
    const { sort, sortField } = this.sortObj;

    const gridData = JSON.parse(JSON.stringify(this.response.gridData)); // get deep clone
    if (sort && sortField) {
      gridData.sort(this.sortAscending(sortField));
      if (sort === 'desc') {
        gridData.reverse(); // sort Descending
      }
    }

    const startingRecord = this.pageSize * this.currentPage - this.pageSize + 1;
    const endingRecord = this.pageSize * this.currentPage;
    const gridItemsForDisplay = [];
    for (let i = startingRecord - 1; i < endingRecord; i++) {
      if (gridData[i]) {
        gridItemsForDisplay.push(gridData[i]);
      } else {
        break;
      }
    }
    this.gridItems = gridItemsForDisplay;
    this.loadingData = false;
    this.changeDetectorRef.detectChanges();
    this.cdkVirtualScrollViewport.elementRef.nativeElement.scrollTop = 0;
    setTimeout(() => {
      this.calculateGridWidth();
    }, 100);
  }

  // update grid data add by SOG-web
  updateGridData(data: GridResponseInterface): void {
    this.response = {
      gridData: data.gridData,
      totalCount: data.totalCount,
      other: data.other,
    };
    this.responseBackup = {
      gridData: data.gridData,
      totalCount: data.totalCount,
      other: data.other,
    };

    this.changeDetectorRef.detectChanges();
  }

  private linkCreationInterceptor(gridData: any[]): any[] {
    const urlHeadings: any[] = [];
    this.headings.forEach((heading) => {
      if (heading?.clickable === 'url') {
        urlHeadings.push({
          type: heading.fieldName,
          urlTemplate: heading.other?.urlTemplate,
          queryParams: heading.other?.queryParams,
          source: heading.other?.source,
        });
      }
    });

    const items = gridData.map((item) => {
      const obj: any = {};
      urlHeadings.forEach((heading) => {
        const splitUrl = heading.urlTemplate.split('/');
        const newUrl: any[] = [];
        splitUrl.forEach((urlItem: any) => {
          if (urlItem.includes(':')) {
            urlItem = item[urlItem.substring(1)];
          }
          newUrl.push(urlItem);
        });
        obj[heading.type + 'Link'] = newUrl.join('/');
        if (heading.queryParams) {
          let objParams: any = null;
          if (heading.source === 'external') {
            objParams = '';
            Object.keys(heading.queryParams).forEach((field) => {
              objParams += field + '=' + item[heading.queryParams[field]] + '&';
            });
            objParams = objParams.slice(0, -1);
          } else {
            objParams = {};
            Object.keys(heading.queryParams).forEach((field) => {
              objParams[field] = item[heading.queryParams[field]];
            });
          }

          obj[heading.type + 'QueryParams'] = objParams;
        }
      });
      return { ...item, ...obj };
    });
    return items;
  }

  toggleFullScreen(ev: boolean): void {
    this.fullscreen = ev;
    setTimeout(() => {
      // wait until dom adjusts
      this.calculateGridWidth();
    });
  }

  openLinkInNewTab(link: string, params: any = {}): void {
    let paramString = '?';
    // if (isEmpty(params)) {
    //   paramString = '';
    // }
    Object.keys(params).forEach((key) => {
      paramString += key + '=' + params[key];
    });
    window.open(link + paramString);
  }

  openExternalLinkInNewTab(link: string, params: any): void {
    if (params) {
      window.open(link + '?' + params);
    } else {
      window.open(link);
    }
  }

  goToLink(fieldName: string, item: string, click?: string): void {
    this.buttonClickEmit.emit({ fieldName, item, click });
  }
}
