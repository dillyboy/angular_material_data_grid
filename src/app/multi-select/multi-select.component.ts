import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  @ViewChild('mySelect') mySelect;
  selection = new FormControl();
  selectionList: any[] = [
    {text : 'Female', value: 'female'},
    {text : 'Male', value: 'male'}];
  allSelected = false;
  searchFilter = '';
  multiple = true;
  constructor() { }

  ngOnInit(): void {
  }

  selectionChange(): void {
    if (this.selection.value?.length === this.selectionList.length) {
      this.allSelected = true;
    } else {
      this.allSelected = false;
    }
  }

  close(): void {
    console.log(this.selection.value);
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
