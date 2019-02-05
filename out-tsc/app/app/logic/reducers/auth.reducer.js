var INITIAL_STATE = {
    token: null,
    image: null
};
export function reducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        default: {
            return state;
        }
    }
}
export var getAuthToken = function (state) { return state.token; };
//# sourceMappingURL=auth.reducer.js.map