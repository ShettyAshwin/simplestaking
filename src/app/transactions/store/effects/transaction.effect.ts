import { Injectable } from "@angular/core"
import{ Effect, Actions, ofType} from '@ngrx/effects';
import * as tranActions from '../actions/transaction.action';
import { map, switchMap, catchError} from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { of } from 'rxjs';

@Injectable()
export class TransactionEffects{
    constructor(private actions: Actions, private service:TransactionService) {
        
    }

    @Effect()
    transactionLoad = this.actions.pipe(ofType(tranActions.TRANSACTION_LOAD)).pipe(
        switchMap((action : tranActions.transactionLoad)=>{
            return this.service.getTransactions(action.lastRecordId).pipe(
                map(trans => new tranActions.transactionLoadSuccess(trans)),
                catchError(error=> of(new tranActions.transactionLoadFail(error)))
            )
        })
    );
}