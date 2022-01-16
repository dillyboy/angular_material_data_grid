import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output
} from '@angular/core';
import {Subscription} from 'rxjs';
import GridHeadingInterface from '../../interfaces/grid-heading-type';
import GridButtonClickInterface from '../../interfaces/grid-button-click-interface';
import GridResponseInterface from '../../interfaces/grid-response';
import GridFilterItemInterface from '../../interfaces/grid-filter-item';
import {GridService} from '../grid.service';
import GridSortItemInterface from '../../interfaces/grid-sort-item';

@Component({
  selector: 'amdg-child-grid',
  templateUrl: './child-grid.component.html',
  styleUrls: ['./child-grid.component.scss', '../server-bind-grid/server-bind-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildGridComponent implements OnInit {

  @Output() responseEmit: any = new EventEmitter<GridResponseInterface>();
  @Output() buttonClickEmit: any = new EventEmitter<GridButtonClickInterface>();
  @Output() filtersChangedEmit: any = new EventEmitter<GridFilterItemInterface[]>();

  @Input() headings: GridHeadingInterface[] = [];
  @Input() url = '';
  @Input() entity: any = null;

  loadingData = false;
  response: GridResponseInterface = { gridData: [], totalCount: 0};
  responseBackup: GridResponseInterface = { gridData: [], totalCount: 0};
  gridItems: any[] = [];
  recordsPerPage = 100;
  gridPostSubscription: Subscription = new Subscription();
  currentPage = 1;
  @Input() serverSidePagination = false;
  filters: GridFilterItemInterface[] = [];
  sortObj: GridSortItemInterface = {
    sort: null,
    sortField: null
  };
  selectedRows = [];


  constructor(private changeDetectorRef: ChangeDetectorRef,
              private gridService: GridService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getData({pageNo: 1, recordsPerPage: this.recordsPerPage});
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
    const sortObj = {
      sort: this.headings[index]?.sort,
      sortField: this.headings[index]?.sort ? this.headings[index]?.fieldName : null
    };
    this.sortObj = sortObj;
    if (this.serverSidePagination) {
      this.getData({pageNo: 1, recordsPerPage: this.recordsPerPage});
    } else {
      this.pageChanged({pageNo: 1, recordsPerPage: this.recordsPerPage});
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

    if (this.serverSidePagination === false) {
      this.ngZone.runOutsideAngular(() => {
        const operators: any = {
          between: (field: string, range: string) => {
            const [min, max] = range.split('-').map(Number);
            return min <= parseInt(field, 10) && parseInt(field, 10) <= max;
          },
          betweendates: (field: string, range: string) => {
            const [min, max] = range.split('-');
            return new Date(min) <= new Date(field) && new Date(field) <= new Date(max);
          },
          eq: (field: string, value: string) => {
            if (value.includes(',') || field.includes(',')) {
              // return value.split(',').includes(field);
              return value.split(',').some(item => field.split(',').includes(item));
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

        const result = this.responseBackup.gridData.filter(o =>
          this.filters.every(({ field, operator, value }) => {
            return operators[operator](makeSearchFriendly(o[field]), makeSearchFriendly(value));
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
      this.pageChanged({pageNo: 1, recordsPerPage: this.recordsPerPage});
    } else {
      this.getData({pageNo: 1, recordsPerPage: this.recordsPerPage});
    }
  }

  openLinkInNewTab(link: string, params: any = {}): void {
    let paramString = '?';
    // if (isEmpty(params)) {
    //   paramString = '';
    // }
    Object.keys(params).forEach(key => {
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
    this.buttonClickEmit.emit({fieldName, item, click});
  }

  // page change event
  getData({pageNo, recordsPerPage}: any): void {

    if (this.gridPostSubscription) {
      this.gridPostSubscription.unsubscribe();
      this.gridPostSubscription = new Subscription();
    }

    this.recordsPerPage = recordsPerPage;
    this.loadingData = true;
    this.currentPage = pageNo;
    this.changeDetectorRef.detectChanges();

    let body = null;
    if (this.serverSidePagination) {
      body = {
        entity: this.entity,
        page: this.currentPage,
        perPage: recordsPerPage,
        filters: this.filters,
        ...this.sortObj
      };
    } else {
      body = {
        entity: this.entity
      };
    }

    console.log(body);

    this.gridPostSubscription = this.gridService.getAnyPost(this.url, body).subscribe(data => {

      const gridData = this.linkCreationInterceptor(data.payload.gridData);
      this.selectedRows = [];
      this.response = {gridData, totalCount: data.payload.totalCount};
      this.responseBackup = {gridData, totalCount: data.payload.totalCount};
      this.gridItems = gridData;
      this.responseEmit.emit(this.response);
      if (this.serverSidePagination) {
        this.loadingData = false;
        this.changeDetectorRef.detectChanges();
        // document.getElementById('amdgScrollViewport').scrollTop = 0;
        // setTimeout(() => {
        //   this.calculateGridWidth();
        // }, 100);
      } else {
         this.pageChanged({pageNo: this.currentPage, recordsPerPage: this.recordsPerPage});
      }

    });
  }

  private linkCreationInterceptor(gridData: any[]): any[] {

    const urlHeadings: any[] = [];
    this.headings.forEach(heading => {
      if (heading?.clickable === 'url') {
        urlHeadings.push({
          type: heading.fieldName,
          urlTemplate: heading.other?.urlTemplate,
          queryParams: heading.other?.queryParams,
          source: heading.other?.source,
        });
      }
    });

    const items = gridData.map(item => {
      const obj: any = {};
      urlHeadings.forEach(heading => {
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

  private sortAscending(sortField: string): any {
    let sortOrder = 1;
    if (sortField[0] === '-') {
      sortOrder = -1;
      sortField = sortField.substr(1);
    }
    return (a: any, b: any) => {
      const result = (a[sortField] < b[sortField]) ? -1 : (a[sortField] > b[sortField]) ? 1 : 0;
      return result * sortOrder;
    };
  }

  pageChanged({pageNo, recordsPerPage}: any): void { // only applicable to client side pagination
    this.loadingData = true;
    this.selectedRows = [];
    this.changeDetectorRef.detectChanges();
    this.recordsPerPage = recordsPerPage;
    this.currentPage = pageNo;
    const {sort, sortField} = this.sortObj;

    const gridData = JSON.parse(JSON.stringify(this.response.gridData)); // get deep clone
    if (sort && sortField) {
      gridData.sort(this.sortAscending(sortField));
      if (sort === 'desc') {
        gridData.reverse(); // sort Descending
      }
    }

    const startingRecord = (this.recordsPerPage * this.currentPage) - this.recordsPerPage + 1;
    const endingRecord = this.recordsPerPage * this.currentPage;
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
    // document.getElementById('amdgScrollViewport').scrollTop = 0;
    // setTimeout(() => {
    //   this.calculateGridWidth();
    // }, 100);
  }

}
