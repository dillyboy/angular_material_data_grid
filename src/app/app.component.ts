import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkMode = false;
  links = ['Overview', 'Basics'];
  selectedLink = 'Overview';

  constructor() {
  }
  changePage(): void {
    console.log('change');
  }
}
