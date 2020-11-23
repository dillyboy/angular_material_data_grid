import { Component, Renderer2 } from '@angular/core';
import { navigation } from './navigation';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  darkMode = false;
  sidePanelNavigation = navigation;
  routerEvents = null;
  currentNav = '';
  links = ['Demo', 'Introduction', 'Installation', 'Basic Usage'];
  // Client Side Pagination
  // Server Side Pagination
  // Filters & Sorting
  // Column reordering and optional columns
  selectedLink = 'Demo';

  constructor(private renderer: Renderer2, private router: Router, private route: ActivatedRoute) {
    this.darkMode = (localStorage.getItem('darkMode')  === 'true');
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'darkMode');
    }

    this.routerEvents = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlWithoutQueryParams = event.url.split('?')[0];
        const [levelOne, levelTwo] = urlWithoutQueryParams.split('/').filter(item => item);
        this.currentNav = '/' + levelOne + '/' + levelTwo;
        window.scrollTo(0, 0);
      }
    });
  }

  themeChanged(): void {
    localStorage.setItem('darkMode', this.darkMode.toString());
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'darkMode');
    } else {
      this.renderer.removeClass(document.body, 'darkMode');
    }
  }

  goToRoute(item): void {
    this.selectedLink = item.headingName;
    this.router.navigate([item.route]);
  }

  ngOnDestroy() {
    this.routerEvents.unsubscribe();
  }

}
