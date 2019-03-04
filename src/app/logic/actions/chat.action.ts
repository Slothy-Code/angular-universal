import {Action} from '@ngrx/store';
import {Conversation} from '@logic/models/conversation';
import {Message} from '@logic/models/message';
import {User} from '@logic/models/user';

export const LISTEN_TO_CHAT = '[Chat] LISTEN_TO_CHAT';

export const FETCH_CONVERSATIONS = '[Chat] FETCH_CONVERSATIONS';
export const FETCH_CONVERSATIONS_SUCCESS = '[Chat] FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAIL = '[Chat] FETCH_CONVERSATIONS_FAILED';

export const CREATE_CONVERSATION = '[Chat] CREATE_CONVERSATION';
export const CREATE_CONVERSATION_SUCCESS = '[Chat] CREATE_CONVERSATION_SUCCESS';
export const CREATE_CONVERSATION_FAIL = '[Chat] CREATE_CONVERSATION_FAIL';

export const SEND_MESSAGE = '[Chat] SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = '[Chat] SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = '[Chat] SEND_MESSAGE_FAIL';

export const UPDATE_CONVERSATION_SUCCESS = '[Chat] UPDATE_CONVERSATION_SUCCESS';

export const FETCH_MESSAGES = '[Chat] FETCH_MESSAGES';
export const FETCH_MESSAGES_SUCCESS = '[Chat] FETCH MESSAGES SUCCESS';

export const FETCH_USERS_SUCCESS = '[Chat] FETCH USERS SUCCESS';

export const RECEIVE_MESSAGE = '[Chat] RECEIVE_MESSAGE';

export const SELECT_CONVERSATION = '[Chat] SELECT_CONVERSATION';

export class ListenToChat implements Action {
    readonly type = LISTEN_TO_CHAT;

    constructor() {
    }
}

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

export class UpdateConversationSuccess implements Action {
    readonly type = UPDATE_CONVERSATION_SUCCESS;

    constructor(public payload: Conversation) {
    }
}

export class FetchConversationsFail implements Action {
    readonly type = FETCH_CONVERSATIONS_FAIL;

    constructor(public error: any) {
    }
}

export class FetchMessages implements Action {
    readonly type = FETCH_MESSAGES;

    constructor(public conversationId: string, public page: number = 1) {
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

export class ReceiveMessage implements Action {
    readonly type = RECEIVE_MESSAGE;

    constructor(public payload: Message) {
    }
}

export class SelectConversation implements Action {
    readonly type = SELECT_CONVERSATION;

    constructor(public payload: Conversation) {
    }

}

export class SendMessage implements Action {
    readonly type = SEND_MESSAGE;

    constructor(public conversation: Conversation, public message: string) {
    }
}

export class SendMessageSuccess implements Action {
    readonly type = SEND_MESSAGE_SUCCESS;

    constructor(public payload: Conversation) {
    }

}

export class SendMessageFail implements Action {
    readonly type = SEND_MESSAGE_FAIL;

    constructor(public error: any) {
    }

}

export class CreateConversation implements Action {
    readonly type = CREATE_CONVERSATION;

    constructor(public userIds: string[]) {
    }
}

export class CreateConversationSuccess implements Action {
    readonly type = CREATE_CONVERSATION_SUCCESS;

    constructor(public payload: Conversation) {
    }
}

export class CreateConversationFail implements Action {
    readonly type = CREATE_CONVERSATION_FAIL;

    constructor(public error: any) {
    }
}


export type Actions =
    ListenToChat
    | FetchConversations
    | FetchConversationsSuccess
    | FetchConversationsFail
    | FetchMessagesSuccess
    | FetchUsersSuccess
    | UpdateConversationSuccess
    | ReceiveMessage
    | SelectConversation
    | SendMessage
    | SendMessageSuccess
    | SendMessageFail
    | CreateConversation
    | CreateConversationFail
    | CreateConversationSuccess;

