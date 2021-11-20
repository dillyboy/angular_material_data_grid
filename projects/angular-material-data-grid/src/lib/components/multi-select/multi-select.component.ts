import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { GridService } from '../../grids/grid.service';

@Component({
  selector: 'amdg-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, OnChanges {

  @Output() filter: any = new EventEmitter<any>();
  @Input() initialFilter = null;
  @Input() resetFilters = null;
  @Input() filterConfig: any = {
    selectionMode: null,
    source: null,
    url: null,
    optionsObject: [],
    key: null,
    value: null,
    stringList: null
  };

  @ViewChild('mySelect') mySelect;
  @ViewChild('fromElement') fromElement: ElementRef;
  selection = new FormControl();
  selectionValuesApplied = [];
  selectionList: any[] = [];
  allSelected = false;
  searchFilter = '';
  multiple = true;
  filterApplied = false;
  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.multiple = this.filterConfig.selectionMode === 'multiple' ? true : false;

    if (this.filterConfig.source === 'external') {
      this.gridService.getAny(this.filterConfig.url).subscribe(data => {
        if (data.statusCode === 200) {
          const {key, value} = this.filterConfig;
          this.selectionList = data.payload.map(item => {
            return {text : item[key], value: item[value], hide: false};
          });
          this.setInitialFilters();
        }
      });
    } else { // internal
      this.selectionList = this.filterConfig.optionsObject.map(item => ({...item, hide: false}));
      this.setInitialFilters();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resetFilters?.currentValue) {
      this.reset(false);
    }
  }

  private setInitialFilters(): void {
    if (this.initialFilter) {
      if (this.multiple) {
        const values = this.initialFilter.value.split(',');
        const filterValues = [];
        values.forEach(val => {
          filterValues.push(...this.selectionList.filter(selection => selection.value === val.trim()));
        });
        this.selection.setValue(filterValues);
        this.selectionValuesApplied = JSON.parse(JSON.stringify(values));
      } else {
        const i = this.selectionList.findIndex(selection => selection.value === this.initialFilter.value);
        if (i !== -1) {
          this.filterApplied = true;
          this.selection.setValue(this.selectionList[i]);
          this.selectionValuesApplied = [this.selectionList[i].text];
        }
      }
    }
  }

  menuOpened(): void {
    this.fromElement.nativeElement.focus();
  }

  selectionChange(): void {
    if (this.selection.value?.length === this.selectionList.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    if (this.multiple === false) {
      const {text, value} = this.selection.value;
      this.selectionValuesApplied = [text];
      this.filter.emit({operator: 'eq', value});
      this.filterApplied = true;
      this.mySelect.close();
    }

  }

  close(): void {
    const texts = this.selection.value?.map(val => val.text);
    const values = this.selection.value?.map(val => val.value);
    this.selectionValuesApplied = JSON.parse(JSON.stringify(texts));
    const value = values?.toString();
    if (value) {
      this.filter.emit({operator: 'eq', value});
      this.filterApplied = true;
    }
    this.mySelect.close();
  }

  toggle(): void {
    this.searchFilter = '';
    this.changeSearch();
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.selection.setValue(this.selectionList);
    } else {
      this.selection.setValue([]);
    }
  }

  reset(emit = true): void {
    this.selectionValuesApplied = [];
    if (this.multiple) {
      this.selection.setValue([]);
    } else {
      this.selection.setValue(null);
    }
    if (emit) {
      this.filter.emit({operator: 'eq', value: null});
    }
    this.filterApplied = false;
    this.mySelect.close();
  }

  changeSearch(): void {
    this.selectionList.forEach((value, i) => {
      value.hide = !value.text.toLowerCase().includes(this.searchFilter.toLowerCase());
    });
  }

  searchFilterKeydown(event): void {
    // prevent default behavior of selecting an option when the user filters the options with space being added
    if (event.code === 'Space') {
      event.stopPropagation();
    }
  }

}
