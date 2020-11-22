import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-url-builder',
  templateUrl: './url-builder.component.html',
  styleUrls: ['./url-builder.component.scss']
})
export class UrlBuilderComponent implements OnInit {

  ts = `
headings: GridHeading[] = [
  ...
  { fieldName: 'first_name', display: 'First Name', type: 'url',
    other: {
      openTab: true,
      urlTemplate: '/gettingStarted/demo/:uid',
      queryParams: {userEmail: 'email'}
    }
  },
  {fieldName: 'url', display: 'URL', type: 'url', width: '120px',
    other: {
      openTab: true,
      urlTemplate: 'https://stackoverflow.com',
      queryParams: {userEmail: 'email'},
      source: 'external'
    }
  },
]`;

  constructor() { }

  ngOnInit(): void {
  }

}
