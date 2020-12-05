import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'amdg-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: ['./string-input.component.css']
})
export class StringInputComponent implements OnInit {

  @Input() initialValue = '';
  @Input() filterType = '';
  value = new FormControl();
  constructor() { }

  ngOnInit(): void {
    this.value.setValue(this.initialValue);
    console.log(this.filterType);

    this.value.valueChanges.subscribe(change => {
      console.log(change);
    });
  }

}
