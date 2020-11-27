import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent {

  @Output() filter: any = new EventEmitter<any>();
  filterApplied = false;
  dateFilterTypes = [
    {value: 'between', text: 'Is Between'},
    {value: 'blank', text: 'Is Empty'},
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  selection = new FormControl('between', Validators.required);
  value = new FormControl(null, [Validators.required]);
  invalidValue = false;
  @ViewChild('menuTrigger') menu: MatMenuTrigger;
  @ViewChild('fromElement') fromElement: ElementRef;
  @ViewChild('picker') picker: MatDatepicker<any>;

  constructor() { }

  menuOpened(): void {
    setTimeout(() => {
      this.picker.open();
    }, 100);

  }

  changeSelection(): void{
    if (this.selection.value === 'blank') {
      this.value.disable();
    } else {
      this.value.enable();
    }
  }

  reset(emit?): void {
    this.invalidValue = false;
    this.value.setValue(null);
    this.selection.setValue('between');
    this.range.controls.start.setValue(null);
    this.range.controls.end.setValue(null);
    if (emit) {
      this.close(null);
    }
  }

  validate(): void {
    if (this.range.valid && this.selection.value !== 'blank') {
      this.invalidValue = false;
      const {start, end} = this.range.value;
      if (start && end) {
        this.value.setValue(`${this.formatDate(start)}-${this.formatDate(end)}`);
        this.filter.emit( {operator: 'between', value: this.value.value} );
      }
      this.close(this.value.value);
    } else if (this.selection.value === 'blank') {
      this.value.setValue(`Is Empty`);
      this.close('blank');
    }else {
      this.invalidValue = true;
    }
  }

  private close(value: string): void {
    this.filter.emit({ operator: this.selection.value, value });
    if (value) {
      this.filterApplied = true;
    } else {
      this.filterApplied = false;
    }
    this.menu.closeMenu();
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
