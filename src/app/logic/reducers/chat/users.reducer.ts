import {FETCH_USERS_SUCCESS} from '../../actions/chat.action';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {User} from '@logic/models/user';

export interface State extends EntityState<User> {
    loading: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user._id
});

export const INITIAL_STATE: State = adapter.getInitialState({
    loading: false
});

export function reducer(state: State = INITIAL_STATE, action) {
    switch (action.type) {

        case FETCH_USERS_SUCCESS: {
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

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const selectUserIds = selectIds;
export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;
export const selectUsersTotal = selectTotal;
