import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: any, args?: any): any {
    if (args === undefined) {
      return values;
    }

    return values.filter(value => {
      return value.text.toLowerCase().includes(args.toLowerCase());
    });
  }

}
