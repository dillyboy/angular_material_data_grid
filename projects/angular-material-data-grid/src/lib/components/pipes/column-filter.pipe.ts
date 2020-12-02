import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnFilter'
})
export class ColumnFilterPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): any[] {
    const headings = [];
    value.forEach(heading => {
      if (heading.show || heading.show === undefined) {
        headings.push(heading);
      }
    });
    return headings;
  }

}
