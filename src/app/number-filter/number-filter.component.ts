import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-number-filter',
  templateUrl: './number-filter.component.html',
  styleUrls: ['./number-filter.component.scss']
})
export class NumberFilterComponent implements OnInit {


  numericFilterTypes = [
    {value: 'between', text: 'Is between'},
    {value: 'eq', text: 'Is equal to'},
    {value: 'neq', text: 'Is not equal to'},
    {value: 'greaterorequal', text: 'Is greater than or equal to'},
    {value: 'greaterthan', text: 'Is greater than'},
    {value: 'lessthanorequal', text: 'Is less than or equal to'},
    {value: 'lessthan', text: 'Is less than'}
  ];
  selection = new FormControl('between');
  constructor() { }

  ngOnInit(): void {
  }

  close(): void {

  }

}
