var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { AuthEffects } from "@logic/effects/auth.effects";
var LogicModule = /** @class */ (function () {
    function LogicModule() {
    }
    LogicModule = __decorate([
        NgModule({
            imports: [
                HttpClientModule,
                EffectsModule.forRoot([AuthEffects]),
                StoreModule.forRoot(reducers),
                StoreDevtoolsModule.instrument()
            ]
        })
    ], LogicModule);
    return LogicModule;
}());
export { LogicModule };
//# sourceMappingURL=logic.module.js.map