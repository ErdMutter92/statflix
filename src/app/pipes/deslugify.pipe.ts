import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deslugify',
})
export class DeslugifyPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.replace(/_/g, ' ');
  }
}
