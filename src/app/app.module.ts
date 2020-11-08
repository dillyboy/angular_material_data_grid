import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialDataGridModule } from './angular-material-data-grid/angular-material-data-grid.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialDataGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
