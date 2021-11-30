import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { navigation } from './navigation';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { MatDrawer } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements AfterViewInit , OnDestroy {
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
  mobile = false;
  @ViewChild('drawer') drawer: MatDrawer;
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(private renderer: Renderer2,
              private router: Router,
              private platform: Platform,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
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

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    // this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngAfterViewInit(): void {
    if (this.platform.ANDROID || this.platform.IOS || this.mobileQuery.matches) {
      this.mobile = true;
      this.drawer.close();
    }
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
    if (this.mobile) {
      this.drawer.close();
    }
  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
