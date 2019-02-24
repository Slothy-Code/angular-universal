import * as fromConversations from '@logic/reducers/chat/conversations.reducer';
import * as fromMessages from '@logic/reducers/chat/messages.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ChatState {
    conversations: fromConversations.State;
    messages: fromMessages.State;
}

export const reducers: ActionReducerMap<ChatState> = {
    conversations: fromConversations.reducer,
    messages: fromMessages.reducer
};

/* MAIN SELECTORS */
export const getConversationsState = createFeatureSelector<ChatState>('chat');

/* Chat */
export const getAllConversations = createSelector(getConversationsState, fromConversations.getAllConversations);

