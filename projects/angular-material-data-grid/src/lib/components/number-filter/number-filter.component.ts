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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'amdg-number-filter',
  templateUrl: './number-filter.component.html',
  styleUrls: ['./number-filter.component.scss']
})
export class NumberFilterComponent implements OnInit, OnChanges {

  @Input() initialFilter = null;
  @Input() resetFilters = null;
  @Output() filter: any = new EventEmitter<any>();
  filterApplied = false;
  numericFilterTypes = [
    {value: 'between', text: 'Is between'},
    {value: 'eq', text: 'Is equal to'},
    {value: 'neq', text: 'Is not equal to'},
    {value: 'greaterorequal', text: 'Is greater than or equal to'},
    {value: 'greaterthan', text: 'Is greater than'},
    {value: 'lessthanorequal', text: 'Is less than or equal to'},
    {value: 'lessthan', text: 'Is less than'}
  ];
  selection = new FormControl('between', Validators.required);
  range = new FormGroup({
    from: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    to: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
  });
  value = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]);
  filterParam = '';
  invalidRangeValue = false;
  invalidValue = false;
  @ViewChild('menuTrigger') menu: MatMenuTrigger;
  @ViewChild('fromElement') fromElement: ElementRef;
  @ViewChild('valueElement') valueElement: ElementRef;

  constructor() { }

  ngOnInit(): void {
    if (this.initialFilter) {
      this.selection.setValue(this.initialFilter.operator);
      this.filterParam = this.initialFilter.value;
      if (this.initialFilter.operator === 'between') {
        const [start, end] = this.initialFilter.value.split('-');
        this.range.controls.from.setValue(start);
        this.range.controls.to.setValue(end);
      } else {
        this.value.setValue(this.initialFilter.value);
      }
      this.filterApplied = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resetFilters?.currentValue) {
      this.reset(false);
    }
  }

  menuOpened(): void {
    if (this.selection.value === 'between') {
      this.fromElement.nativeElement.focus();
    } else {
      this.valueElement.nativeElement.focus();
    }
  }

  reset(emit?): void {
    this.invalidRangeValue = false;
    this.invalidValue = false;
    this.range.controls.from.setValue(null);
    this.range.controls.to.setValue(null);
    this.value.setValue(null);
    this.filterParam = '';
    this.close(null, emit);
  }

  validate(): void {
    if (this.selection.value === 'between') {
      if (this.range.valid) {
        const {from, to} = this.range.value;
        if (from < to) {
          this.invalidRangeValue = false;
          this.filterParam = from + '-' + to;
          this.close(from + '-' + to);
        } else {
          this.invalidRangeValue = true;
        }
      } else {
        this.invalidRangeValue = true;
      }
    } else {
      if (this.value.valid) {
        this.invalidValue = false;
        this.filterParam = this.value.value;
        this.close(this.value.value);
      } else {
        this.invalidValue = true;
      }
    }
  }

  private close(value: string, emit = true): void {
    if (emit) {
      this.filter.emit({operator: this.selection.value, value});
    }
    if (value) {
      this.filterApplied = true;
    } else {
      this.filterApplied = false;
    }
    this.menu.closeMenu();
  }

}
