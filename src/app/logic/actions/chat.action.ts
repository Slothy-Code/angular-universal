import {Action} from '@ngrx/store';
import {Conversation} from '@logic/models/conversation';

export const FETCH_CONVERSATIONS = '[Chat] FETCH_CONVERSATIONS';
export const FETCH_CONVERSATIONS_SUCCESS = '[Chat] FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAIL = '[Chat] FETCH_CONVERSATIONS_FAILED';

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

export type Actions =
    FetchConversations
    | FetchConversationsSuccess
    | FetchConversationsFail;
