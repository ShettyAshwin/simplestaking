import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'transactionFormat'
})
export class TransactionFormatPipe implements PipeTransform {

  transform(value: unknown): unknown {
    return moment(value).format('MMM DD YYYY, hh:mm');
  }

}
