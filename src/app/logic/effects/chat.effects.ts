import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ChatService} from '@logic/services/chat/chat.service';
import {FETCH_CONVERSATIONS, FetchConversationsFail, FetchConversationsSuccess} from '@logic/actions/chat.action';
import {Conversation} from '@logic/models/conversation';

@Injectable()
export class ChatEffects {

    @Effect()
    fetchConversations$: Observable<Action> = this.actions$
        .pipe(ofType(FETCH_CONVERSATIONS),
            mergeMap((action => {
                return this.chatService.getConversations()
                    .pipe(map((conversations: Conversation[]) =>
                            new FetchConversationsSuccess(conversations)),
                        catchError((error => of(new FetchConversationsFail(error))))
                    );
            }))
        );

    constructor(private actions$: Actions, private chatService: ChatService) {
    }
}
