import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        // PrebootModule.withConfig({appRoot: 'app-root'})
      ],
      providers: [],
      bootstrap: [AppComponent]
})
export class AppModule { }
