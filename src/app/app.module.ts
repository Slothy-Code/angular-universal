import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {CoreModule} from "@shared/core.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    RouterModule.forRoot([
      { path: '', loadChildren: './pages/landpage/landpage.module#LandpageModule'},
      { path: 'about', loadChildren: './pages/about/about.module#AboutModule'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
