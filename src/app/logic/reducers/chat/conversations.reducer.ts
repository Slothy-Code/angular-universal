import {Conversation} from '../../models/conversation';
import {FETCH_CONVERSATIONS, FETCH_CONVERSATIONS_FAIL, FETCH_CONVERSATIONS_SUCCESS} from '../../actions/chat.action';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface State extends EntityState<Conversation> {
    loading: boolean;
}

export const adapter: EntityAdapter<Conversation> = createEntityAdapter<Conversation>({
    selectId: (conversation: Conversation) => conversation._id
});

export const INITIAL_STATE: State = adapter.getInitialState({
    loading: false
});

export function reducer(state: State = INITIAL_STATE, action) {
    switch (action.type) {

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

        case FETCH_CONVERSATIONS_FAIL: {
            return {
                ...state,
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}

export const getAllConversations = (state) => state.conversations;
