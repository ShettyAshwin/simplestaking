import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ITransaction } from '../interfaces/i-transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http : HttpClient) {

  }

  getTransactions(cursorPointer : number = null, totalRows : number = 10 ):Observable<ITransaction[]>{
    return this.http.get<ITransaction[]>(environment.baseUrl + '/tables/op?columns=row_id,type,time,sender,volume,fee&receiver=tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo&type=transaction&limit=' + totalRows + (cursorPointer ? '&cursor.lte=' + cursorPointer : ''))
    .pipe(map((resp : any[])=>{
      if(resp && resp.length > 0){
        var result : ITransaction[] = [];
        resp.forEach((e)=>{
          let transaction = <ITransaction>{}
          transaction.type = e[1];
          transaction.timeStamp = e[2];
          transaction.address = e[3];
          transaction.id = e[0];
          transaction.fee=e[5];
          result.push(transaction);
        })
        return result;
      } else {
        return [];
      }
    }))
  }

}
