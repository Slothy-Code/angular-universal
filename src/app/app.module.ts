import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {CoreModule} from '@shared/core.module';
import {AuthenticationGuard} from '@shared/guards/authentication/authentication.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    RouterModule.forRoot([
      { path: '', loadChildren: './pages/landpage/landpage.module#LandpageModule'},
      { path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
      { path: 'home', loadChildren: './pages/home/home.module#HomeModule', canActivate: [AuthenticationGuard]},
      { path: 'about', loadChildren: './pages/about/about.module#AboutModule'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
