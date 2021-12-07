import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'template'
})
export class TemplatePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, args: any): SafeHtml {
    let modifiedTemplate = value;
    const splitOne = value.split('{{');
    splitOne.splice(0, 1); // remove first element
    splitOne.forEach((item: string) => {
      const [customVariable] = item.split('}}');
      modifiedTemplate = modifiedTemplate.replaceAll( '{{' + customVariable + '}}', args[customVariable]);
    });
    return this.sanitizer.bypassSecurityTrustHtml(modifiedTemplate);
  }

}
