import { Action } from '@ngrx/store';
import { ITransaction } from '../../interfaces/i-transaction';

export const TRANSACTION_LOAD = "[Transactions] Load Transactions";
export const TRANSACTION_FAIL = "[Transactions] Fail to load Transactions ";
export const TRANSACTION_SUCCESS = "[Transactions] Sucessfully Loaded Transactions";

export class transactionLoad implements Action {
    readonly type = TRANSACTION_LOAD
    constructor(public lastRecordId : number = null){
        
    }
}

export class transactionLoadFail implements Action {
    readonly type = TRANSACTION_FAIL
    constructor(public payload : any){

    }
}

export class transactionLoadSuccess implements Action {
    readonly type = TRANSACTION_SUCCESS
    constructor(public payload : ITransaction[]){
        
    }
}


export type transactionAction = transactionLoad | transactionLoadFail | transactionLoadSuccess;