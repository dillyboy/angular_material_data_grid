import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnSearchFilter'
})
export class ColumnSearchFilterPipe implements PipeTransform {

  transform(values: any[], args: any): any[] {
    if (args === undefined) {
      return values;
    }

    return values.filter(value => {
      return value.display.toLowerCase().includes(args.toLowerCase());
    });
  }

}
