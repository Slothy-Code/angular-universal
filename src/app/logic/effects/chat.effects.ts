import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ChatService} from '@logic/services/chat/chat.service';
import {
    CREATE_CONVERSATION,
    CreateConversation,
    CreateConversationFail,
    CreateConversationSuccess,
    FETCH_CONVERSATIONS,
    FETCH_MESSAGES,
    FetchConversationsFail,
    FetchConversationsSuccess,
    FetchMessages,
    FetchMessagesSuccess,
    FetchUsersSuccess,
    LISTEN_TO_CHAT,
    ReceiveMessage,
    SELECT_CONVERSATION,
    SelectConversation,
    SEND_MESSAGE,
    SendMessage,
    SendMessageFail,
    SendMessageSuccess,
    UpdateConversationSuccess,
} from '@logic/actions/chat.action';
import {Conversation} from '@logic/models/conversation';
import {conversationNormalize} from '@logic/normalization/conversation.normalize';
import {Message} from '@logic/models/message';

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

    @Effect()
    listen$: Observable<Action> = this.actions$
        .pipe(ofType(LISTEN_TO_CHAT),
            mergeMap((action => {
                return this.chatService.listen()
                    .pipe(mergeMap((conversation: Conversation) => {
                            const data = conversationNormalize([conversation]).entities;
                            return [
                                new UpdateConversationSuccess(Object.values(data.conversations)[0] as Conversation),
                                new ReceiveMessage(Object.values(data.messages)[0] as Message)
                            ];
                        })
                    );
            }))
        );

    @Effect()
    select$: Observable<Action> = this.actions$
        .pipe(ofType(SELECT_CONVERSATION),
            map((action: SelectConversation) => {
                return new FetchMessages(action.payload._id);
            }));

    @Effect()
    fetchConversation$: Observable<Action> = this.actions$
        .pipe(ofType(FETCH_MESSAGES),
            mergeMap(((action: FetchMessages) => {
                return this.chatService.getConversation(action.conversationId, action.page)
                    .pipe(mergeMap((conversations: Conversation) => {
                            const data = conversationNormalize([conversations]).entities;
                            return [
                                new FetchUsersSuccess(Object.values(data.users)),
                                new FetchMessagesSuccess(Object.values(data.messages)),
                                new UpdateConversationSuccess(Object.values(data.conversations)[0] as Conversation)
                            ];
                        }),
                        catchError((error => of(new FetchConversationsFail(error))))
                    );
            }))
        );

    @Effect()
    sendMessage$: Observable<Action> = this.actions$
        .pipe(ofType(SEND_MESSAGE),
            mergeMap((action: SendMessage) =>
                this.chatService.sendMessage(action.conversation, action.message)
                    .pipe(map((conversation: Conversation) => new SendMessageSuccess(conversation)),
                        catchError((error => of(new SendMessageFail(error)))))
            ));

    @Effect()
    createConversation: Observable<Action> = this.actions$
        .pipe(ofType(CREATE_CONVERSATION),
            mergeMap((action: CreateConversation) =>
                this.chatService.createConversation(action.userIds)
                    .pipe(map((conversation: Conversation) => new CreateConversationSuccess(conversation)),
                        catchError(error => of(new CreateConversationFail(error)))
                    ))
        );


    constructor(private actions$: Actions, private chatService: ChatService) {
    }
}
