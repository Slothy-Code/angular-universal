var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
var AppServerModule = /** @class */ (function () {
    function AppServerModule() {
    }
    AppServerModule = __decorate([
        NgModule({
            imports: [
                // The AppServerModule should import your AppModule followed
                // by the ServerModule from @angular/platform-server.
                AppModule,
                ServerModule,
                ModuleMapLoaderModule,
                ServerTransferStateModule,
            ],
            // Since the bootstrapped component is not inherited from your
            // imported AppModule, it needs to be repeated here.
            bootstrap: [AppComponent],
        })
    ], AppServerModule);
    return AppServerModule;
}());
export { AppServerModule };
//# sourceMappingURL=app.server.module.js.map