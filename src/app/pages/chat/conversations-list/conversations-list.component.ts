import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getAllConversations} from '@logic/chat-store';
import {CreateConversation, FetchConversations, SelectConversation} from '@logic/actions/chat.action';
import {ChatService} from '@logic/services/chat/chat.service';
import {Conversation} from '@logic/models/conversation';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {getCurrentUser} from '@logic/store';
import {take} from 'rxjs/operators';
import {User} from '@logic/models/user';


@Component({
    selector: 'conversations-list-component',
    templateUrl: './conversations-list.component.html',
    styleUrls: ['./conversations-list.component.scss']
})

export class ConversationsListComponent implements OnInit {
    conversations$: Observable<Conversation[]>;
    newConversationForm = new FormGroup({
        'ids': new FormControl('')
    });

    constructor(private chatService: ChatService, private store: Store<{}>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new FetchConversations());

        this.conversations$ = this.store.pipe(select(getAllConversations));
    }

    selectConversation(conversation: Conversation) {
        this.store.dispatch(new SelectConversation(conversation));
    }

    createConversation() {
        this.store.pipe(select(getCurrentUser), take(1)).subscribe((user: User) => {
            this.store.dispatch(new CreateConversation([user._id, this.newConversationForm.value.ids]));//todo parse etc
        });
    }
}
