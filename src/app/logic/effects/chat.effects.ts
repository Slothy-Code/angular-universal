import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, mergeMap} from 'rxjs/operators';
import {ChatService} from '@logic/services/chat/chat.service';
import {
    FETCH_CONVERSATIONS,
    FetchConversationsFail,
    FetchConversationsSuccess,
    FetchMessagesSuccess,
    FetchUsersSuccess,
} from '@logic/actions/chat.action';
import {Conversation} from '@logic/models/conversation';
import {conversationNormalize} from '@logic/normalization/conversation.normalize';

@Injectable()
export class ChatEffects {

    @Effect()
    fetchConversations$: Observable<Action> = this.actions$
        .pipe(ofType(FETCH_CONVERSATIONS),
            mergeMap((action => {
                return this.chatService.getConversations()
                    .pipe(mergeMap((conversations: Conversation[]) => {
                            const data = conversationNormalize(conversations).entities;
                            return [
                                new FetchUsersSuccess(Object.values(data.users)),
                                new FetchMessagesSuccess(Object.values(data.messages)),
                                new FetchConversationsSuccess(Object.values(data.conversations))
                            ];
                        }),
                        catchError((error => of(new FetchConversationsFail(error))))
                    );
            }))
        );

    constructor(private actions$: Actions, private chatService: ChatService) {
    }
}
