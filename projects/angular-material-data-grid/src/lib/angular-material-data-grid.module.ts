import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerBindGridComponent } from './grids/server-bind-grid/server-bind-grid.component';
import { ChildGridComponent } from './grids/child-grid/child-grid.component';
import { TemplatePipe } from './grids/server-bind-grid/template.pipe';
import { TemplateObjectPipe } from './grids/server-bind-grid/template_object.pipe';
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
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { RouterModule } from '@angular/router';
import { TagFilterComponent } from './components/tag-filter/tag-filter.component';
import { MatDividerModule} from '@angular/material/divider';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';

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
        TemplatePipe,
        TemplateObjectPipe,
        ChildGridComponent
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
    exports: [ServerBindGridComponent]
})
export class AngularMaterialDataGridModule { }
