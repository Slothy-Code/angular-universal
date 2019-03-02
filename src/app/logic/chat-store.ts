import * as fromConversations from '@logic/reducers/chat/conversations.reducer';
import * as fromMessages from '@logic/reducers/chat/messages.reducer';
import * as fromUsers from '@logic/reducers/chat/users.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {conversationDenormalize} from '@logic/normalization/conversation.normalize';

export interface ChatState {
    conversations: fromConversations.State;
    messages: fromMessages.State;
    users: fromUsers.State;
}

export const reducers: ActionReducerMap<ChatState> = {
    conversations: fromConversations.reducer,
    messages: fromMessages.reducer,
    users: fromUsers.reducer
};

/* MAIN SELECTORS */
export const getChatState = createFeatureSelector<ChatState>('chat');
export const getConversationsState = createSelector(getChatState, state => state.conversations);
export const getMessagesState = createSelector(getChatState, state => state.messages);
export const getUsersState = createSelector(getChatState, state => state.users);

/* Chat */
const getAllMessageEntities = createSelector(getMessagesState, fromMessages.selectMessageEntities);
const getAllUserEntities = createSelector(getUsersState, fromUsers.selectUserEntities);
const getAllConversationEntities = createSelector(getConversationsState, fromConversations.selectConversationEntities);
const getSelectedConversationId = createSelector(getConversationsState, fromConversations.getSelectedId);

export const getAllConversations = createSelector(getAllUserEntities, getAllMessageEntities, getAllConversationEntities,
    (users, messages, conversations) => {
        const entities = {users, messages, conversations};
        return conversationDenormalize(entities);
    });

export const getConversationById = (id: string) => createSelector(getAllConversations, (conversations) => {
    return conversations.find(conversation => conversation._id === id);
});

export const getSelectedConversation = createSelector(getSelectedConversationId, getAllConversations, (id, conversations) => {
    return conversations.find(conversation => conversation._id === id);
});
