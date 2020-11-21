import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from '../pages/demo/demo.component';
import { DetailComponent } from '../pages/detail/detail.component';
import { OverviewComponent } from '../pages/overview/overview.component';
import { ContainerComponent } from '../components/container/container.component';
import { IntroductionComponent } from '../pages/introduction/introduction.component';
import { InstallationComponent } from '../pages/installation/installation.component';
import { BasicUsageComponent } from '../pages/basic-usage/basic-usage.component';

const routes: Routes = [
  { path: '' , redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'gettingStarted', component: ContainerComponent,
    children: [
      { path: 'demo', component: DemoComponent },
      { path: 'demo/:uid', component: DetailComponent },
      { path: 'introduction', component: IntroductionComponent },
      { path: 'installation', component: InstallationComponent },
      { path: 'basicUsage', component: BasicUsageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
