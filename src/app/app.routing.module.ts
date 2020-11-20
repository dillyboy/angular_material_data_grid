import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ContainerComponent } from './components/container/container.component';

const routes: Routes = [
    { path: '' , redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'gettingStarted', component: ContainerComponent,
        children: [
            {path: 'home', component: HomeComponent},
            { path: 'detail/:uid', component: DetailComponent },
        ]
    },
    // { path: 'detail/:uid', component: DetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
