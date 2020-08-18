import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiResponseModel } from '../api-response.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  @Output() filter: any = new EventEmitter<any>();
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
  selection = new FormControl();
  selectionList: any[] = [];
  allSelected = false;
  searchFilter = '';
  multiple = true;
  filterApplied = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.multiple = this.filterConfig.selectionMode === 'multiple' ? true : false;

    if (this.filterConfig.source === 'external') {
      this.http.get<ApiResponseModel>(this.filterConfig.url).subscribe(data => {
        if (data.statusCode === 200) {
          const {key, value} = this.filterConfig;
          this.selectionList = data.payload.map(item => {
            return {text : item[key], value: item[value]};
          });
        }
      });
    } else { // internal
      this.selectionList = this.filterConfig.optionsObject;
    }
  }

  selectionChange(): void {
    if (this.selection.value?.length === this.selectionList.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    if (this.multiple === false) {
      this.filter.emit({operator: 'eq', value: this.selection.value.value});
      this.mySelect.close();
    }

  }

  close(): void {
    const values = this.selection.value?.map(val => val.value);
    const value = values?.toString();
    if (value) {
      this.filter.emit({operator: 'eq', value});
      this.filterApplied = true;
    }
    this.mySelect.close();
  }

  toggle(): void {
    this.searchFilter = '';
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.selection.setValue(this.selectionList);
    } else {
      this.selection.setValue([]);
    }
  }

  reset(): void {
    if (this.multiple) {
      this.selection.setValue([]);
    } else {
      this.selection.setValue(null);
    }
    this.filter.emit({operator: 'eq', value: null});
    this.filterApplied = false;
    this.mySelect.close();
  }

}
