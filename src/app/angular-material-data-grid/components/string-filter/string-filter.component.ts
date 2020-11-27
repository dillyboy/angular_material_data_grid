import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.scss']
})
export class StringFilterComponent {

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
  selection = new FormControl('contains', Validators.required);
  value = new FormControl(null, [Validators.required]);
  invalidValue = false;
  @ViewChild('menuTrigger') menu: MatMenuTrigger;
  @ViewChild('fromElement') fromElement: ElementRef;
  @ViewChild('valueElement') valueElement: ElementRef;

  constructor() { }

  menuOpened(): void {
    this.valueElement.nativeElement.focus();
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
    this.selection.setValue('contains');
    this.value.setValue(null);

    if (emit) {
      this.close(null);
    }
  }

  validate(): void {
    if (this.value.valid) {
      this.invalidValue = false;
      this.close(this.value.value);
    } else if (this.selection.value === 'blank') {
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

}
