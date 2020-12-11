import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerBindGridComponent } from './grids/server-bind-grid/server-bind-grid.component';
import { GridComponent } from './grids/grid/grid.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ColumnFilterPipe } from './components/pipes/column-filter.pipe';
import { SearchPipe } from './components/pipes/search.pipe';
import { ColumnSearchFilterPipe } from './components/pipes/column-search-filter.pipe';
import { SortHeaderComponent } from './components/sort-header/sort-header.component';
import { FilterHeaderComponent } from './components/filter-header/filter-header.component';
import { StringFilterComponent } from './components/string-filter/string-filter.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { NumberFilterComponent } from './components/number-filter/number-filter.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
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
import { RouterModule } from '@angular/router';
import { TagFilterComponent } from './components/tag-filter/tag-filter.component';
import { MatDividerModule} from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ClientPaginationComponent } from './components/client-pagination/client-pagination.component';

@NgModule({
  declarations: [
    PaginationComponent,
    ConfirmationComponent,
    ColumnFilterPipe,
    SearchPipe,
    ColumnSearchFilterPipe,
    SortHeaderComponent,
    FilterHeaderComponent,
    MultiSelectComponent,
    NumberFilterComponent,
    DateFilterComponent,
    StringFilterComponent,
    TagFilterComponent,
    ServerBindGridComponent,
    GridComponent,
    ClientPaginationComponent
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
    MatSelectModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  ],
  entryComponents: [
    ConfirmationComponent
  ],
  exports: [ServerBindGridComponent, GridComponent]
})
export class AngularMaterialDataGridModule { }
