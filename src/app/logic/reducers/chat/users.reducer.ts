import {INSERT_MESSAGES} from '../../actions/chat.action';
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

        case INSERT_MESSAGES: {
            return {
                ...adapter.addMany(action.payload, state),
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}

