import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {reducers} from './chat-store';
import {ChatEffects} from '@logic/effects/chat.effects';
import {ChatService} from '@logic/services/chat/chat.service';

@NgModule({
    imports: [
        EffectsModule.forRoot([ChatEffects]),
        StoreModule.forFeature('chat', reducers),
        StoreDevtoolsModule.instrument()
    ],
    providers: [
        ChatService
    ]
})
export class ChatLogicModule {
}
