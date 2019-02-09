
export interface State {
    _id: string;
    name: string;
    permissions: string[];
    role: string;
}

const INITIAL_STATE: State = {
    _id: null,
    name: null,
    permissions: [],
    role: null
};

export function reducer(state: State = INITIAL_STATE, action) {
    switch (action.type) {

        default: {
            return state;
        }
    }
}

export const getAuthToken = (state) => state.token;
