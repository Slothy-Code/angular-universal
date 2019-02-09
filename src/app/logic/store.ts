import * as fromAuth from '@logic/reducers/auth.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {UserStore} from '@logic/models/user';

export interface AppState {
    auth: UserStore;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.reducer,
};

/* MAIN SELECTORS */
export const getAuthState = createFeatureSelector<AppState>('auth');

/* Auth */
export const getAuthToken = createSelector(getAuthState, fromAuth.getAuthToken);

