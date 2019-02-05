import * as fromAuth from '@logic/reducers/auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export var reducers = {
    auth: fromAuth.reducer,
};
/* MAIN SELECTORS */
export var getAuthState = createFeatureSelector('auth');
/* Auth */
export var getAuthToken = createSelector(getAuthState, fromAuth.getAuthToken);
//# sourceMappingURL=store.js.map