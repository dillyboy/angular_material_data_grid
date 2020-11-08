import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialDataGridComponent } from './angular-material-data-grid.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ColumnFilterPipe } from './components/pipes/column-filter.pipe';
import { SearchPipe } from './components/pipes/search.pipe';
import { SortHeaderComponent } from './components/sort-header/sort-header.component';
import { FilterHeaderComponent } from './components/filter-header/filter-header.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { NumberFilterComponent } from './components/number-filter/number-filter.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { StringFilterComponent } from './components/string-filter/string-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    PaginationComponent,
    AngularMaterialDataGridComponent,
    ConfirmationComponent,
    ColumnFilterPipe,
    SearchPipe,
    SortHeaderComponent,
    FilterHeaderComponent,
    MultiSelectComponent,
    NumberFilterComponent,
    DateFilterComponent,
    StringFilterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule
  ],
  entryComponents: [
    ConfirmationComponent
  ],
  exports: [
    AngularMaterialDataGridComponent

  ]
})
export class AngularMaterialDataGridModule { }
