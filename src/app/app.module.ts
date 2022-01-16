import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AngularMaterialDataGridModule } from 'angular-material-data-grid';
import { AngularMaterialDataGridModule } from '../../projects/angular-material-data-grid/src/lib/angular-material-data-grid.module';
import { AppRoutingModule } from './routing/app.routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OverviewComponent } from './pages/overview/overview.component';
import { ContainerComponent } from './components/container/container.component';
import { DemoComponent } from './pages/demo/demo.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { InstallationComponent } from './pages/installation/installation.component';
import { PropertiesAndEventsComponent } from './pages/properties-and-events/properties-and-events.component';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { MatTabsModule } from '@angular/material/tabs';
import { ColumnsAndFiltersComponent } from './pages/columns-and-filters/columns-and-filters.component';
import { StringFilterComponent } from './pages/string-filter/string-filter.component';
import { MultiSelectFilterComponent } from './pages/multi-select-filter/multi-select-filter.component';
import { TagFilterComponent } from './pages/tag-filter/tag-filter.component';
import { NumericFilterComponent } from './pages/numeric-filter/numeric-filter.component';
import { DateRangeFilterComponent } from './pages/date-range-filter/date-range-filter.component';
import { UrlBuilderComponent } from './pages/url-builder/url-builder.component';
import { ButtonGroupBuilderComponent } from './pages/button-group-builder/button-group-builder.component';
import { ColumnControlComponent } from './pages/column-control/column-control.component';
import { ItemSelectionComponent } from './pages/item-selection/item-selection.component';
import { ThemingComponent } from './pages/theming/theming.component';
import { FixedHeaderComponent } from './pages/fixed-header/fixed-header.component';
import { VirtualScrollingComponent } from './pages/virtual-scrolling/virtual-scrolling.component';
import { ServerBindGridExampleComponent } from './pages/server-bind-grid-example/server-bind-grid-example.component';
import { ClientSidePaginationGridExampleComponent } from './pages/client-side-pagination-grid-example/client-side-pagination-grid-example.component';
import { ReinitializeGridExampleComponent } from './pages/reinitialize-grid-example/reinitialize-grid-example.component';
import { PreconfiguredFiltersExampleComponent } from './pages/preconfigured-filters-example/preconfigured-filters-example.component';
import { CustomDemoComponent } from './pages/custom-demo/custom-demo.component';
import { MasterDetailExampleComponent } from './pages/master-detail-example/master-detail-example.component';
import { MasterDetailChildGridExampleComponent } from './pages/master-detail-child-grid-example/master-detail-child-grid-example.component';
import { MasterDetailBreakdownGridExampleComponent } from './pages/master-detail-breakdown-grid-example/master-detail-breakdown-grid-example.component';
import { MasterDetailHtmlExampleComponent } from './pages/master-detail-html-example/master-detail-html-example.component';
import { OpenDialogComponent } from './pages/open-dialog/open-dialog.component';
import { GridWithinDialogComponent } from './pages/open-dialog/grid-within-dialog/grid-within-dialog.component';
import { TopRightButtonsExampleComponent } from './pages/top-right-buttons-example/top-right-buttons-example.component';
import { ChangeLogComponent } from './pages/change-log/change-log.component';
import { TransparencyExampleComponent } from './pages/transparency-example/transparency-example.component';
import { CellStylesExampleComponent } from './pages/cell-styles-example/cell-styles-example.component';
import { DynamicHeadingsExampleComponent } from './pages/dynamic-headings-example/dynamic-headings-example.component';
import { ImageTypeComponent } from './pages/image-type/image-type.component';

@NgModule({
    declarations: [
        AppComponent,
        OverviewComponent,
        DemoComponent,
        DetailComponent,
        ContainerComponent,
        IntroductionComponent,
        InstallationComponent,
        PropertiesAndEventsComponent,
        ColumnsAndFiltersComponent,
        StringFilterComponent,
        MultiSelectFilterComponent,
        TagFilterComponent,
        NumericFilterComponent,
        DateRangeFilterComponent,
        UrlBuilderComponent,
        ButtonGroupBuilderComponent,
        ColumnControlComponent,
        ItemSelectionComponent,
        ThemingComponent,
        FixedHeaderComponent,
        VirtualScrollingComponent,
        ServerBindGridExampleComponent,
        ClientSidePaginationGridExampleComponent,
        ReinitializeGridExampleComponent,
        PreconfiguredFiltersExampleComponent,
        CustomDemoComponent,
        MasterDetailExampleComponent,
        MasterDetailChildGridExampleComponent,
        MasterDetailBreakdownGridExampleComponent,
        MasterDetailHtmlExampleComponent,
        OpenDialogComponent,
        GridWithinDialogComponent,
        TopRightButtonsExampleComponent,
        ChangeLogComponent,
        TransparencyExampleComponent,
        CellStylesExampleComponent,
        DynamicHeadingsExampleComponent,
        ImageTypeComponent
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
        MatCardModule,
        MatMenuModule,
        MatTabsModule,
        HighlightModule,
        MatTooltipModule,
        MatSnackBarModule
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                fullLibraryLoader: () => import('highlight.js'),
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
