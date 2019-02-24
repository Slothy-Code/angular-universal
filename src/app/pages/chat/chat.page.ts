import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ChatState} from '@logic/chat-store';
import {FetchConversations} from '@logic/actions/chat.action';
import {ChatService} from '@logic/services/chat/chat.service';


@Component({
    selector: 'page-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss']
})

export class ChatPage implements OnInit {

    constructor(private chatService: ChatService, private store: Store<ChatState>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new FetchConversations());
        this.chatService.listen().subscribe(data => {
            console.log(data);
        });
    }

}
