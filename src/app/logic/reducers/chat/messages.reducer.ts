import {FETCH_MESSAGES_SUCCESS, RECEIVE_MESSAGE} from '../../actions/chat.action';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Message} from '@logic/models/message';

export interface State extends EntityState<Message> {
    loading: boolean;
}

export const adapter: EntityAdapter<Message> = createEntityAdapter<Message>({
    selectId: (message: Message) => message._id
});

export const INITIAL_STATE: State = adapter.getInitialState({
    loading: false
});

export function reducer(state: State = INITIAL_STATE, action) {
    switch (action.type) {

        case FETCH_MESSAGES_SUCCESS: {
            return {
                ...adapter.addMany(action.payload, state),
                loading: false
            };
        }

        case RECEIVE_MESSAGE: {
            return adapter.addOne(action.payload, state);
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

export const selectMessageIds = selectIds;
export const selectMessageEntities = selectEntities;
export const selectAllMessages = selectAll;
export const selectMessagesTotal = selectTotal;

