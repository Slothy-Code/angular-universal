import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';
import {ChatPage} from '@pages/chat/chat.page';
import {ChatLogicModule} from '@logic/chat-logic.module';

@NgModule({
    imports: [
        SharedModule,
        ChatLogicModule,
        RouterModule.forChild([
            {path: '', component: ChatPage}
        ])
    ],
    declarations: [
        ChatPage
    ],
    exports: []
})
export class ChatModule {
}
