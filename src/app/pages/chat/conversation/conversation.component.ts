import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getSelectedConversation} from '@logic/chat-store';
import {ChatService} from '@logic/services/chat/chat.service';
import {Conversation} from '@logic/models/conversation';
import {Observable} from 'rxjs';

@Component({
    selector: 'conversation-component',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss']
})

export class ConversationComponent implements OnInit {
    conversation$: Observable<Conversation>;

    constructor(private chatService: ChatService, private store: Store<{}>) {
    }

    ngOnInit(): void {
        this.conversation$ = this.store.pipe(select(getSelectedConversation));
    }

}
