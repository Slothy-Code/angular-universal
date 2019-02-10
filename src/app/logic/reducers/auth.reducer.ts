import {
    USER_FETCH_PERMISSIONS,
    USER_FETCH_PERMISSIONS_SUCCESS,
    USER_LOGIN,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_RESTORE_SESSION
} from '@logic/actions/auth.action';

export interface State {
    loading: boolean;
    _id: string;
    token: { token: string, exp: number, iat: number };
    name: string;
    permissions: string[];
    role: string;
}

const INITIAL_STATE: State = {
    _id: null,
    name: null,
    role: null,
    permissions: [],
    token: {token: null, exp: 0, iat: null},
    loading: false
};

export function reducer(state: State = INITIAL_STATE, action) {
    switch (action.type) {

        case USER_LOGIN:
        case USER_FETCH_PERMISSIONS:
        case USER_RESTORE_SESSION: {
            return {
                ...state,
                loading: true
            };
        }

        case USER_LOGIN_SUCCESS:
        case USER_FETCH_PERMISSIONS_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        }

        case USER_LOGIN_FAIL: {
            return {
                ...state,
                loading: false
            };
        }

        case USER_LOGOUT: {
            return INITIAL_STATE;
        }

        default: {
            return state;
        }
    }
}

export const getAuthToken = (state) => state.token;
export const getCurrentUser = (state) => state;
