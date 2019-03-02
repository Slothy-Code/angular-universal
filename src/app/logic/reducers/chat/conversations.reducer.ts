import {Conversation} from '../../models/conversation';
import {
    FETCH_CONVERSATIONS,
    FETCH_CONVERSATIONS_FAIL,
    FETCH_CONVERSATIONS_SUCCESS,
    LISTEN_TO_CHAT,
    SELECT_CONVERSATION,
    UPDATE_CONVERSATION_SUCCESS
} from '../../actions/chat.action';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface State extends EntityState<Conversation> {
    loading: boolean;
    listening: boolean;
    selected: string;
}

export const adapter: EntityAdapter<Conversation> = createEntityAdapter<Conversation>({
    selectId: (conversation: Conversation) => conversation._id
});

export const INITIAL_STATE: State = adapter.getInitialState({
    loading: false,
    listening: false,
    selected: null
});

export function reducer(state: State = INITIAL_STATE, action) {
    switch (action.type) {

        case LISTEN_TO_CHAT:
            return {
                ...state,
                listening: true
            };

        case FETCH_CONVERSATIONS:
            return {
                ...state,
                loading: true
            };


        case FETCH_CONVERSATIONS_SUCCESS: {
            return {
                ...adapter.addMany(action.payload, state),
                loading: false
            };
        }

        case UPDATE_CONVERSATION_SUCCESS: {
            const storeConversation = {...state.entities[action.payload._id]};
            const messagesSet = new Set([...storeConversation.messages, ...action.payload.messages]);
            const conversation = {...action.payload, messages: Array.from(messagesSet)};
            return {
                ...adapter.upsertOne(conversation, state)
            };
        }

        case FETCH_CONVERSATIONS_FAIL: {
            return {
                ...state,
                loading: false
            };
        }

        case SELECT_CONVERSATION: {
            return {
                ...state,
                selected: action.payload._id
            };
        }

        default: {
            return state;
        }
    }
}

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const selectConversationIds = selectIds;
export const selectConversationEntities = selectEntities;
export const selectAllConversations = selectAll;
export const selectConversationsTotal = selectTotal;

export const getSelectedId = (state) => state.selected;