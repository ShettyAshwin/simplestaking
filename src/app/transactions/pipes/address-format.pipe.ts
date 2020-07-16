import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFormat'
})
export class AddressFormatPipe implements PipeTransform {

  transform(value: string): unknown {
    if(value){
      if(value.length > 5){  return value.substr(0,2) + '...' + value.substr(value.length-5);}
      return value;
    }
    return '';
  }

}
