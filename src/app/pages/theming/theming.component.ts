import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss']
})
export class ThemingComponent implements OnInit {

  ts = `
  import { Renderer2 } from '@angular/core';
  ...
  export class SampleComponent {
    darkMode = true;
    constructor(private renderer: Renderer2) {
      if (this.darkMode) {
        this.renderer.addClass(document.body, 'darkMode'); // add this
      }
    }
  }
`;
  constructor() { }

  ngOnInit(): void {
  }

}
