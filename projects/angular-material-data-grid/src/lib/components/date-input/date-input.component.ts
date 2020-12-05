import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'amdg-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit {

  @Input() initialValue = '';
  value = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.value.setValue(new Date(this.initialValue));
  }

  datedChanged(): void {
    console.log(this.formatDate(this.value.value));
  }

  private formatDate(date): void {
    try {
      if (date) {
        let month = (date.getMonth() + 1).toString();
        if (month.length === 1) {
          month = '0' +  month.toString();
        }
        let day = (date.getDate()).toString();
        if (day.length === 1) {
          day = '0' +  day.toString();
        }
        date = `${month}/${day}/${date.getFullYear()}`;
      }
      return date;
    } catch (e) {
      return date;
    }
  }

}
