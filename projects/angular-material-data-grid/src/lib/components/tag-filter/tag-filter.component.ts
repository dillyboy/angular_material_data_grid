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
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import GridFilterItemInterface from '../../interfaces/grid-filter-item';

@Component({
  selector: 'amdg-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.scss']
})
export class TagFilterComponent implements OnInit, OnChanges {

  @Input() initialFilter?: GridFilterItemInterface;
  @Input() resetFilters = null;
  @Input() numbersOnly = false;
  @Output() filter: any = new EventEmitter<any>();
  @ViewChild('menuTrigger') menu!: MatMenuTrigger;
  @ViewChild('fromElement') fromElement!: ElementRef;
  filterApplied = false;
  tagValue = new FormControl('', []);
  tagValues: string[] = [];
  tagValuesApplied = [];
  error = '';
  maximumTagLimit = 5000 as const;
  stringMaxLength = 30 as const;
  numberMaxLength = 9 as const;

  constructor() {
    this.tagValue.markAsDirty();
    this.tagValue.markAsTouched();
  }

  ngOnInit(): void {
    if (this.initialFilter && typeof this.initialFilter.value !== "number") {
        const tagValues = this.initialFilter.value.split(',').map(item => item.trim());
      if (tagValues.length <= this.maximumTagLimit) {
        this.tagValues = tagValues;
        this.tagValuesApplied = JSON.parse(JSON.stringify(this.tagValues));
        this.filterApplied = true;
      } else {
        console.error(`Only a maximum of ${this.maximumTagLimit} tags can be added`);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetFilters']?.currentValue) {
      this.reset(false);
    }
  }

  menuOpened(): void {
    this.fromElement.nativeElement.focus();
  }

  validate(): void {
    if (this.tagValues.length > 0) {
      this.tagValuesApplied = JSON.parse(JSON.stringify(this.tagValues));
      this.filter.emit({ operator: 'eq', value: this.tagValues.join() });
      this.filterApplied = true;
    } else {
      this.filterApplied = false;
    }
    this.menu.closeMenu();
  }

  reset(emit = true): void {
    this.tagValues = [];
    this.tagValuesApplied = [];
    if (emit) {
      this.filter.emit({ operator: 'eq', value: null });
    }
    this.filterApplied = false;
    this.tagValue.setErrors(null);
    this.tagValue.setValue('');
    this.menu.closeMenu();
  }

  addTagValue(event: Event): void {
    event.stopPropagation();
    if (this.tagValues.length < this.maximumTagLimit) {
      let maxLength: number = this.numberMaxLength;
      if (!this.numbersOnly) {
        maxLength = this.stringMaxLength;
      }
      const {value} = this.tagValue;
      if (value.trim()) {
        if (value.length <= maxLength) {
          if (this.tagValues.indexOf(value) === -1) {
            this.tagValues.push(value);
            this.tagValue.setErrors(null);
            this.tagValue.setValue('');
          } else {
            this.tagValue.setErrors({invalid: true});
            this.error = 'Value already entered';
          }
        } else {
          this.tagValue.setErrors({invalid: true});
          this.error = `A single value cannot be more than ${maxLength} characters`;
        }
      }
    } else {
      this.tagValue.setErrors({invalid: true});
      this.error = `Only a maximum of ${this.maximumTagLimit} tags can be added`;
    }
  }

  tagValueKeypress(event: any): void {
    if (event.charCode !== 0 && this.numbersOnly) {
      const pattern = /[0-9\ ]/;
      const inputChar = String.fromCharCode(event.charCode);

      if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
      }
    }
  }

  stringPaste(event: ClipboardEvent): void {

    let stringList = event.clipboardData?.getData('Text');
    event.preventDefault();

    stringList = stringList?.replace(/	/g, ',');
    stringList = stringList?.replace(/\n/ig, ',');
    stringList = stringList?.replace(/\\t/g, ',');
    stringList = stringList?.replace(/\\n/g, ',');
    stringList = stringList?.replace(/[\r\n]/g, ',');

    let validPaste = true;
    const list = stringList ? stringList?.split(',').filter(Boolean) : []; // remove empty strings
    if (list.length <= this.maximumTagLimit && this.tagValues.length < this.maximumTagLimit &&
         (list.length + this.tagValues.length <= this.maximumTagLimit)) {
      const formattedList: string[] = [];
      let error = '';
      list.forEach(item => {

        // Loop start
        item = item.trim();
        if (this.numbersOnly) {
          if (item.length <= this.numberMaxLength && this.ifNumber(item)) {
            formattedList.push(parseInt(item, 10).toString());
          } else {
            validPaste = false;

            if (!(item.length <= this.numberMaxLength)) {
              error = `A single value cannot be more than ${this.numberMaxLength} characters`;
            } else if (this.ifNumber(item) === false) {
              error = 'Values cannot contain alphanumeric characters';
            }
          }
        } else { // string
          if (item.length <= this.stringMaxLength) {
            formattedList.push(item);
          } else {
            validPaste = false;
            error = `A single value cannot be more than ${this.stringMaxLength} characters`;
          }
        }
      // Loop end

      });

      if (validPaste) {
        const allTagValues = [...this.tagValues, ...new Set(formattedList)]; // make sure to remove duplicates before pushing
        this.tagValues = [...new Set(allTagValues)];
        this.tagValue.setErrors(null);
      } else {
        this.tagValue.setErrors({invalid: true});
        this.error = error;
      }
    } else {
      this.tagValue.setErrors({invalid: true});
      this.error = 'Only a maximum of ' + this.maximumTagLimit + ' tags can be added';
    }
  }

  private ifNumber(numberArg: any): boolean {
    return isNaN(numberArg) === false;
  }

}
