import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PaginationComponent } from './pagination/pagination.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColumnFilterPipe } from './pipes/column-filter.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { FilterHeaderComponent } from './filter-header/filter-header.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    ConfirmationComponent,
    ColumnFilterPipe,
    SortHeaderComponent,
    FilterHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    FormsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
    MatCardModule,
    MatMenuModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [
    ConfirmationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
