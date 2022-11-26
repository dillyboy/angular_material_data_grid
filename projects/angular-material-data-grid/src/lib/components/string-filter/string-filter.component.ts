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
import { FormControl, Validators } from '@angular/forms';
import { MatLegacyMenuTrigger as MatMenuTrigger } from '@angular/material/legacy-menu';
import GridFilterItemInterface from '../../interfaces/grid-filter-item';

@Component({
  selector: 'amdg-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.scss']
})
export class StringFilterComponent implements OnInit, OnChanges {

  @Input() initialFilter?: GridFilterItemInterface;
  @Input() resetFilters = null;
  @Output() filter: any = new EventEmitter<any>();
  filterApplied = false;
  stringFilterTypes = [
    {value: 'eq', text: 'Is equal to'},
    {value: 'neq', text: 'Is not equal to'},
    {value: 'contains', text: 'Contains'},
    {value: 'startswith', text: 'Starts with'},
    {value: 'endswith', text: 'Ends with'},
    {value: 'blank', text: 'Is Empty'},
  ];
  selection = new FormControl<null | string>('contains', Validators.required);
  value = new FormControl<null | string>(null, [Validators.required]);
  filterParam: string | null = '';
  invalidValue = false;
  @ViewChild('menuTrigger') menu!: MatMenuTrigger;
  @ViewChild('fromElement') fromElement!: ElementRef;
  @ViewChild('valueElement') valueElement!: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    if (this.initialFilter) {
      this.selection.setValue(this.initialFilter.operator);
      this.filterApplied = true;
      if (this.initialFilter.operator === 'blank') {
        this.filterParam = 'Is Empty';
        this.value.setValue('Is Empty');
        this.value.disable();
      } else {
        this.filterParam = this.initialFilter.value;
        this.value.setValue(this.initialFilter.value);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetFilters']?.currentValue) {
      this.reset(false);
    }
  }

  menuOpened(): void {
    this.valueElement.nativeElement.focus();
  }

  changeSelection(): void{
    if (this.selection.value === 'blank') {
      this.value.disable();
    } else {
      if (this.value.value === 'Is Empty') {
        this.value.setValue('');
      }
      this.value.enable();
    }
  }

  reset(emit?: boolean): void {
    this.invalidValue = false;
    this.selection.setValue('contains');
    this.value.setValue(null);
    this.value.enable();
    this.close(null, emit);
  }

  validate(): void {
    if (this.value.valid) {
      this.invalidValue = false;
      this.close(this.value.value);
    } else if (this.selection.value === 'blank') {
      this.value.setValue('Is Empty');
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
    this.filterParam = this.value.value;
    this.menu.closeMenu();
  }

}
