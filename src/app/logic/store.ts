import * as fromAuth from '@logic/reducers/auth.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface AppState {
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.reducer,
};

/* MAIN SELECTORS */
export const getAuthState = createFeatureSelector<AppState>('auth');

/* Auth */
export const getAuthToken = createSelector(getAuthState, fromAuth.getAuthToken);

