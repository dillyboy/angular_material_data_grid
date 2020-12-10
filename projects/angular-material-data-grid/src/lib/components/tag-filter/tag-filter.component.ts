import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'amdg-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.scss']
})
export class TagFilterComponent implements OnInit {

  @Input() numbersOnly = false;
  @Output() filter: any = new EventEmitter<any>();
  @ViewChild('menuTrigger') menu: MatMenuTrigger;
  @ViewChild('fromElement') fromElement: ElementRef;
  filterApplied = false;
  tagValue = new FormControl('', []);
  tagValues = [];
  error = '';
  constructor() {
    this.tagValue.markAsDirty();
    this.tagValue.markAsTouched();
  }

  ngOnInit(): void {
  }

  menuOpened(): void {
    this.fromElement.nativeElement.focus();
  }

  validate(): void {
    if (this.tagValues.length > 0) {
      this.filter.emit({ operator: 'eq', value: this.tagValues.join() });
      this.filterApplied = true;
    } else {
      this.filterApplied = false;
    }
    this.menu.closeMenu();
  }

  reset(): void {
    this.tagValues = [];
    this.filter.emit({ operator: 'eq', value: null });
    this.filterApplied = false;
    this.menu.closeMenu();
  }

  addTagValue(event): void {
    event.stopPropagation();
    let maxLength = 9;
    if (!this.numbersOnly) {
      maxLength = 30;
    }
    const {value} = this.tagValue;
    if (value.trim()) {
      if (value.length <= maxLength) {
        if (this.tagValues.indexOf(value) === -1) {
          this.tagValues.push(value);
          // this.tagValue.setErrors(null);
        } else {
          setTimeout(() => {
            this.tagValue.setErrors({invalid: true});
          });
          this.error = 'Value already entered';
        }
      } else {
        setTimeout(() => {
          this.tagValue.setErrors({invalid: true});
        });
        this.error = 'Value too large';
      }
    }
    console.log(this.tagValue);
    this.tagValue.setValue('');
  }

  stringPaste(stringList, event): void {
    event.preventDefault();

    stringList = stringList.replace(/	/g, ',');
    stringList = stringList.replace(/\n/ig, ',');
    stringList = stringList.replace(/\\t/g, ',');
    stringList = stringList.replace(/\\n/g, ',');
    stringList = stringList.replace(/[\r\n]/g, ',');

    let validPaste = true;
    const list = stringList.split(',').filter(Boolean); // remove empty strings

    const formattedList = [];
    let error = '';
    list.forEach(item => {
      item = item.trim();
      if (item.length <= 30) {
        formattedList.push(item);
      } else {
        validPaste = false;

        if (!(item.length <= 30)) {
          error = 'A single value cannot be more than 30 characters';
        }
      }
    });

    if (validPaste) {
      const allTagValues = [ ...this.tagValues, ...new Set(formattedList)]; // make sure to remove duplicates before pushing
      this.tagValues = [ ...new Set(allTagValues)];
    } else {
      setTimeout(() => {
        this.tagValue.setErrors({invalid: true});
      });
      this.error = error;
    }
  }

}
