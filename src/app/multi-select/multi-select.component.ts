import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  @ViewChild('mySelect') mySelect;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  allSelected = false;
  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    console.log(this.toppings.value);
    this.mySelect.close();
  }

  toggle(): void {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.toppings.setValue(this.toppingList);
    } else {
      this.toppings.setValue([]);
    }
  }

}
