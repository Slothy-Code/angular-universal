import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {CoreModule} from '@shared/core.module';
import {AuthenticationGuard} from '@shared/guards/authentication/authentication.guard';
import {extract} from '@shared/services/i18n/i18n.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    RouterModule.forRoot([
      { path: '', loadChildren: './pages/landpage/landpage.module#LandpageModule', data: { title: extract('Login') }},
      { path: 'login', loadChildren: './pages/login/login.module#LoginModule', data: { title: extract('Login') }},
      { path: 'home', loadChildren: './pages/home/home.module#HomeModule', canActivate: [AuthenticationGuard], data: { title: extract('Login') }},
      { path: 'about', loadChildren: './pages/about/about.module#AboutModule', data: { title: extract('Login') }},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
