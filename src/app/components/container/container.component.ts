import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  darkMode = false;
  links = ['Overview', 'Basics'];
  selectedLink = 'Overview';

  constructor(private renderer: Renderer2) {
    this.darkMode = (localStorage.getItem('darkMode')  === 'true');
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'darkMode');
    }
  }
  changePage(): void {
    console.log('change');
  }

  themeChanged(): void {
    localStorage.setItem('darkMode', this.darkMode.toString());
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'darkMode');
    } else {
      this.renderer.removeClass(document.body, 'darkMode');
    }
  }

}
