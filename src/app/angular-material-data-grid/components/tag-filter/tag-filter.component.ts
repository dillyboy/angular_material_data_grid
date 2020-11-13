import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.scss']
})
export class TagFilterComponent implements OnInit {

  @Input() numbersOnly = false;
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
  }

  validate(): void {
  }

  reset(bool): void {
  }

  addTagValue(event): void {
    event.stopPropagation();
    let maxLength = 9;
    if (!this.numbersOnly) {
      maxLength = 15;
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

}
