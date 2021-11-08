import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../environments/environment';
declare var gtag;
declare var ga;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  routerEvents = null;

  constructor(private router: Router) {
    this.routerEvents = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (environment.production) {
          gtag('config', 'G-ZM8GVWTZ4E', {
            page_path: event.urlAfterRedirects
          });
          ga('create', 'G-ZM8GVWTZ4E', {cookieDomain: 'none'});
          ga('send', 'pageview');
        }
      }
    });
  }

}
