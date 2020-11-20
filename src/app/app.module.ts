import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialDataGridModule } from './angular-material-data-grid/angular-material-data-grid.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { OverviewComponent } from './pages/overview/overview.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    HomeComponent,
    DetailComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialDataGridModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    MatExpansionModule,
    MatRippleModule,
    MatListModule,
    MatCardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
