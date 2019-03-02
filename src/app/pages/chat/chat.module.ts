import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';
import {ChatPage} from '@pages/chat/chat.page';
import {ChatLogicModule} from '@logic/chat-logic.module';
import {ConversationsListComponent} from '@pages/chat/conversations-list/conversations-list.component';
import {ConversationComponent} from '@pages/chat/conversation/conversation.component';

@NgModule({
    imports: [
        SharedModule,
        ChatLogicModule,
        RouterModule.forChild([
            {path: '', component: ChatPage}
        ])
    ],
    declarations: [
        ChatPage,
        ConversationsListComponent,
        ConversationComponent
    ],
    exports: []
})
export class ChatModule {
}
