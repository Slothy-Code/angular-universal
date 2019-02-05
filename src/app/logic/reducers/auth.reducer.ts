
export interface State {
    token: string;
    image: string;
}

const INITIAL_STATE: State = {
    token: null,
    image: null
};

export function reducer(state: State = INITIAL_STATE, action) {
    switch (action.type) {

        default: {
            return state;
        }
    }
}

export const getAuthToken = (state) => state.token;
