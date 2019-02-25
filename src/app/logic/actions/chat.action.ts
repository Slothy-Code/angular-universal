import {Action} from '@ngrx/store';
import {Conversation} from '@logic/models/conversation';
import {Message} from '@logic/models/message';
import {User} from '@logic/models/user';

export const FETCH_CONVERSATIONS = '[Chat] FETCH_CONVERSATIONS';
export const FETCH_CONVERSATIONS_SUCCESS = '[Chat] FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAIL = '[Chat] FETCH_CONVERSATIONS_FAILED';


export const FETCH_MESSAGES_SUCCESS = '[Chat] FETCH MESSAGES SUCCESS';

export const FETCH_USERS_SUCCESS = '[Chat] FETCH USERS SUCCESS';

export class FetchConversations implements Action {
    readonly type = FETCH_CONVERSATIONS;

    constructor() {
    }
}

export class FetchConversationsSuccess implements Action {
    readonly type = FETCH_CONVERSATIONS_SUCCESS;

    constructor(public payload: Conversation[]) {
    }
}

export class FetchConversationsFail implements Action {
    readonly type = FETCH_CONVERSATIONS_FAIL;

    constructor(public error: any) {
    }
}

export class FetchMessagesSuccess implements Action {
    readonly type = FETCH_MESSAGES_SUCCESS;

    constructor(public payload: Message[]) {
    }
}

export class FetchUsersSuccess implements Action {
    readonly type = FETCH_USERS_SUCCESS;

    constructor(public payload: User[]) {
    }
}

export type Actions =
    FetchConversations
    | FetchConversationsSuccess
    | FetchConversationsFail
    | FetchMessagesSuccess
    | FetchUsersSuccess;
