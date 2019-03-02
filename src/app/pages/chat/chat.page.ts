import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ListenToChat} from '@logic/actions/chat.action';


@Component({
    selector: 'page-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss']
})

export class ChatPage implements OnInit {
    constructor(private store: Store<{}>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new ListenToChat());
    }

}
