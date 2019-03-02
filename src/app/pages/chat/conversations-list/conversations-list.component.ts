import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getAllConversations} from '@logic/chat-store';
import {FetchConversations, SelectConversation} from '@logic/actions/chat.action';
import {ChatService} from '@logic/services/chat/chat.service';
import {Conversation} from '@logic/models/conversation';
import {Observable} from 'rxjs';


@Component({
    selector: 'conversations-list-component',
    templateUrl: './conversations-list.component.html',
    styleUrls: ['./conversations-list.component.scss']
})

export class ConversationsListComponent implements OnInit {
    conversations$: Observable<Conversation[]>;

    constructor(private chatService: ChatService, private store: Store<{}>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new FetchConversations());

        this.conversations$ = this.store.pipe(select(getAllConversations));
    }

    selectConversation(conversation: Conversation) {
        this.store.dispatch(new SelectConversation(conversation));
    }
}
