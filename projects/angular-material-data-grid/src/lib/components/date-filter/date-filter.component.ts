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
import { MatLegacyMenuTrigger as MatMenuTrigger } from '@angular/material/legacy-menu';
import { MatDatepicker } from '@angular/material/datepicker';
import GridFilterItemInterface from '../../interfaces/grid-filter-item';

@Component({
  selector: 'amdg-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit, OnChanges {

  @Input() initialFilter?: GridFilterItemInterface;
  @Input() resetFilters = null;
  @Output() filter: any = new EventEmitter<any>();
  filterApplied = false;
  dateFilterTypes = [
    {value: 'betweendates', text: 'Is Between'},
    {value: 'blank', text: 'Is Empty'},
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });
  selection = new FormControl<null | string>('betweendates', Validators.required);
  value = new FormControl<null | string>(null, [Validators.required]);
  invalidValue = false;
  @ViewChild('menuTrigger') menu!: MatMenuTrigger;
  @ViewChild('fromElement') fromElement!: ElementRef;
  @ViewChild('picker') picker!: MatDatepicker<any>;

  constructor() { }

  ngOnInit(): void {
    if (this.initialFilter && typeof this.initialFilter.value !== 'number') {
      this.value.setValue(this.initialFilter.value);
      const [start, end] = this.initialFilter.value.split('-');
      this.range.controls['start'].setValue(new Date(start));
      this.range.controls['end'].setValue(new Date(end));
      this.filterApplied = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetFilters']?.currentValue) {
      this.reset(false);
    }
  }

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

  reset(emit?: any): void {
    this.invalidValue = false;
    this.value.setValue(null);
    this.selection.setValue('betweendates');
    this.range.controls['start'].setValue(null);
    this.range.controls['end'].setValue(null);
    this.close(null, emit);
  }

  validate(): void {
    if (this.range.valid && this.selection.value !== 'blank') {
      this.invalidValue = false;
      const {start, end} = this.range.value;
      if (start && end) {
        this.value.setValue(`${this.formatDate(start)}-${this.formatDate(end)}`);
        this.filter.emit( {operator: 'betweendates', value: this.value.value} );
      }
      this.close(this.value.value);
    } else if (this.selection.value === 'blank') {
      this.value.setValue(`Is Empty`);
      this.close('blank');
    }else {
      this.invalidValue = true;
    }
  }

  private close(value: string | null, emit = true): void {
    if (emit) {
      this.filter.emit({ operator: this.selection.value, value });
    }
    if (value) {
      this.filterApplied = true;
    } else {
      this.filterApplied = false;
    }
    this.menu.closeMenu();
  }

  private formatDate(date: any): void {
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
