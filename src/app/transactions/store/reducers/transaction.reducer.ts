import { ITransaction } from '../../interfaces/i-transaction';
import * as frmTranActions from '../actions/transaction.action';
import { TransferState } from '@angular/platform-browser';

export interface transactionState {
    data : ITransaction[],
    loaded: boolean;
    loading: boolean
}

export const initialState : transactionState = {
    data: [],
    loaded : false,
    loading : false
}

export function reducer(state = initialState, action : frmTranActions.transactionAction):transactionState {
    switch(action.type){
        case frmTranActions.TRANSACTION_LOAD : {
            return {
                ...state,
                loading:true
            }
        }
        case frmTranActions.TRANSACTION_SUCCESS : {
            var data = state.data.concat(action.payload);           
            return {
                ...state,
                loading:false,
                loaded:true,
                data
            }
        }
        case frmTranActions.TRANSACTION_FAIL : {
            return {
                ...state,
                loading:false,
                loaded:false
            }
        }
    }
    return state;
}

export const getTransactions = (state: transactionState)=> state.data;
export const getTransactionLoading = (state: transactionState)=> state.loading;
export const getTransactionLoaded = (state: transactionState)=> state.loaded;

