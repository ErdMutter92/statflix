import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: string[] | string, delimiter: string): string {
    if (value instanceof Array) {
      return value.join(delimiter);
    }
    
    return value;
  }

}
