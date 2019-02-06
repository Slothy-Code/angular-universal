import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { StoreModule} from '@ngrx/store';
import {reducers} from './store';
import {AuthEffects} from '@logic/effects/auth.effects';

@NgModule({
    imports: [
        HttpClientModule,
        EffectsModule.forRoot([AuthEffects]),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument()
    ]
})
export class LogicModule {
}
