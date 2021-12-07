import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
declare var gtag: any;
declare var ga: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  routerEvents: Subscription = new Subscription();

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
