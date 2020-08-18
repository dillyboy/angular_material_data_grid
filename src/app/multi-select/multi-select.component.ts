import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiResponseModel } from '../api-response.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  @Input() heading: any = {
    display: null,
    type: 'string',
    sort: '',
    filterType: null,
    disableSorting: false,
    disableFiltering: false,
    other: {
      selectionMode: null,
      source: null,
      url: null,
      optionsObject: [],
      key: null,
      value: null,
      stringList: null
    }
  };

  @ViewChild('mySelect') mySelect;
  selection = new FormControl();
  selectionList: any[] = [];
  allSelected = false;
  searchFilter = '';
  multiple = true;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.multiple = this.heading.other.selectionMode === 'multiple' ? true : false;

    if (this.heading.other.source === 'external') {
      this.http.get<ApiResponseModel>(this.heading.other.url).subscribe(data => {
        if (data.statusCode === 200) {
          const {key, value} = this.heading.other;
          this.selectionList = data.payload.map(item => {
            return {text : item[key], value: item[value]};
          });
        }
      });
    } else { // internal
      this.selectionList = this.heading.other.optionsObject;
    }
  }

  selectionChange(): void {
    if (this.selection.value?.length === this.selectionList.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
    if (this.multiple === false) {
      console.log({operator: 'eq', value: this.selection.value.value});
      this.mySelect.close();
    }

  }

  close(): void {
    const values = this.selection.value?.map(val => val.value);
    const value = values?.toString();
    if (value) {
      console.log({operator: 'eq', value});
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

}
