import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getSelectedConversation} from '@logic/chat-store';
import {ChatService} from '@logic/services/chat/chat.service';
import {Conversation} from '@logic/models/conversation';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {SendMessage} from '@logic/actions/chat.action';
import {take} from 'rxjs/operators';

@Component({
    selector: 'conversation-component',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss']
})

export class ConversationComponent implements OnInit {
    conversation$: Observable<Conversation>;
    form = new FormGroup({
        'message': new FormControl('')
    });

    constructor(private chatService: ChatService, private store: Store<{}>) {
    }

    ngOnInit(): void {
        this.conversation$ = this.store.pipe(select(getSelectedConversation));
    }

    sendMessage() {
        this.conversation$.pipe(take(1)).subscribe(conversation => {
            this.store.dispatch(new SendMessage(conversation, this.form.value.message));
            this.form.reset();
        });
    }
}
