import * as frmTranActions from './transaction.reducer'; 
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'

export interface TezoState {
    transactions: frmTranActions.transactionState
}

export const reducers : ActionReducerMap<TezoState> = {
    transactions: frmTranActions.reducer
}

export const getTelzoState = createFeatureSelector<TezoState>('tezoState');

export const getTransationState = createSelector(getTelzoState,(state:TezoState)=>state.transactions);

export const getAllTransations = createSelector(getTransationState, frmTranActions.getTransactions);
