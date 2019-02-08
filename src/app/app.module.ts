import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {CoreModule} from '@shared/core.module';
import {extract} from '@shared/services/i18n/i18n.service';
import {PermissionGuard} from '@shared/guards/permission/permission.guard';

const routes = [
  { path: '', loadChildren: './pages/landpage/landpage.module#LandpageModule', data: { title: extract('Landpage') }},
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule', data: { title: extract('Login') }},
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule',
    data: {title: extract('Login')}, canActivate: [PermissionGuard.forPermission('test.test')]
  },
  { path: 'about', loadChildren: './pages/about/about.module#AboutModule', data: { title: extract('About') }},
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
