import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-properties-and-events',
  templateUrl: './properties-and-events.component.html',
  styleUrls: ['./properties-and-events.component.scss']
})
export class PropertiesAndEventsComponent implements OnInit {

  importLine = `import { AngularMaterialDataGridModule } from 'angular-material-data-grid';`;
  selector = 'amdg-angular-material-data-grid';
  constructor() { }

  ngOnInit(): void {
  }

}
