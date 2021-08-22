import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from '../pages/demo/demo.component';
import { DetailComponent } from '../pages/detail/detail.component';
import { OverviewComponent } from '../pages/overview/overview.component';
import { ContainerComponent } from '../components/container/container.component';
import { IntroductionComponent } from '../pages/introduction/introduction.component';
import { InstallationComponent } from '../pages/installation/installation.component';
import { PropertiesAndEventsComponent } from '../pages/properties-and-events/properties-and-events.component';
import { ColumnsAndFiltersComponent } from '../pages/columns-and-filters/columns-and-filters.component';
import { StringFilterComponent } from '../pages/string-filter/string-filter.component';
import { MultiSelectFilterComponent } from '../pages/multi-select-filter/multi-select-filter.component';
import { TagFilterComponent } from '../pages/tag-filter/tag-filter.component';
import { NumericFilterComponent } from '../pages/numeric-filter/numeric-filter.component';
import { DateRangeFilterComponent } from '../pages/date-range-filter/date-range-filter.component';
import { ButtonGroupBuilderComponent } from '../pages/button-group-builder/button-group-builder.component';
import { UrlBuilderComponent } from '../pages/url-builder/url-builder.component';
import { ColumnControlComponent } from '../pages/column-control/column-control.component';
import { ItemSelectionComponent } from '../pages/item-selection/item-selection.component';
import { ThemingComponent } from '../pages/theming/theming.component';
import { FixedHeaderComponent } from '../pages/fixed-header/fixed-header.component';
import { VirtualScrollingComponent } from '../pages/virtual-scrolling/virtual-scrolling.component';
import { ServerBindGridExampleComponent } from '../pages/server-bind-grid-example/server-bind-grid-example.component';
import { ClientSidePaginationGridExampleComponent } from '../pages/client-side-pagination-grid-example/client-side-pagination-grid-example.component';
import { ReinitializeGridExampleComponent } from '../pages/reinitialize-grid-example/reinitialize-grid-example.component';
import { PreconfiguredFiltersExampleComponent } from '../pages/preconfigured-filters-example/preconfigured-filters-example.component';
import { CustomDemoComponent } from '../pages/custom-demo/custom-demo.component';
import { MasterDetailExampleComponent } from '../pages/master-detail-example/master-detail-example.component';
import { MasterDetailChildGridExampleComponent } from '../pages/master-detail-child-grid-example/master-detail-child-grid-example.component';
import { MasterDetailHtmlExampleComponent } from '../pages/master-detail-html-example/master-detail-html-example.component';
import { OpenDialogComponent } from '../pages/open-dialog/open-dialog.component';
import { TopRightButtonsExampleComponent } from '../pages/top-right-buttons-example/top-right-buttons-example.component';

const routes: Routes = [
  { path: '' , redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'gettingStarted', component: ContainerComponent,
    children: [
      { path: 'demo', component: DemoComponent },
      { path: 'demo/:id', component: DetailComponent },
      { path: 'introduction', component: IntroductionComponent },
      { path: 'installation', component: InstallationComponent },
      { path: 'propertiesAndEvents', component: PropertiesAndEventsComponent }
    ]
  },
  { path: 'columnsAndFilters', component: ContainerComponent,
    children: [
      { path: 'overview', component: ColumnsAndFiltersComponent },
      { path: 'stringFilter', component: StringFilterComponent },
      { path: 'multiSelectFilter', component: MultiSelectFilterComponent },
      { path: 'tagFilter', component: TagFilterComponent },
      { path: 'numericFilter', component: NumericFilterComponent },
      { path: 'dateRangeFilter', component: DateRangeFilterComponent },
      { path: 'urlBuilder', component: UrlBuilderComponent },
      { path: 'buttonGroupBuilder', component: ButtonGroupBuilderComponent },
    ]
  },
  { path: 'features', component: ContainerComponent,
    children: [
      { path: 'columnControl', component: ColumnControlComponent },
      { path: 'itemSelection', component: ItemSelectionComponent },
      { path: 'theming', component: ThemingComponent },
      { path: 'fixedHeader', component: FixedHeaderComponent },
      { path: 'virtualScrolling', component: VirtualScrollingComponent },
    ]
  },
  { path: 'examples', component: ContainerComponent,
    children: [
      { path: 'clientSidePagination', component: ClientSidePaginationGridExampleComponent },
      { path: 'serverBindGrid', component: ServerBindGridExampleComponent },
      { path: 'reinitializeGrid', component: ReinitializeGridExampleComponent },
      { path: 'preconfiguredFilters', component: PreconfiguredFiltersExampleComponent },
      { path: 'masterDetailGrid', component: MasterDetailExampleComponent },
      { path: 'masterDetailChildGrid', component: MasterDetailChildGridExampleComponent },
      { path: 'masterDetailHtml', component: MasterDetailHtmlExampleComponent },
      { path: 'customDemo', component: CustomDemoComponent },
      { path: 'openDialog', component: OpenDialogComponent },
      { path: 'topRightButtons', component: TopRightButtonsExampleComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
