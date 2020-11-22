import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-group-builder',
  templateUrl: './button-group-builder.component.html',
  styleUrls: ['./button-group-builder.component.scss']
})
export class ButtonGroupBuilderComponent implements OnInit {

  ts = `
headings: GridHeading[] = [
  ...
  { fieldName: 'actions', display: '', type: 'button-group', width: '100px',
    other: {
      mainButton: {
        display: 'Options',
        icon: 'expand_more',
        disableField: 'archived'
      },
      buttons: [
        {display: 'Edit User', icon: 'edit', disableField: 'disableEdit'},
        {display: 'Delete User', icon: 'delete', disableField: 'archived'},
      ]
    },
    align: 'center', disableSorting: true,
  }
]`;

  constructor() { }

  ngOnInit(): void {
  }

}
