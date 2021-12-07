import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'template_object'
})
export class TemplateObjectPipe implements PipeTransform {

  constructor() {}

  transform(value: any, args: any): JSON {
    let modifiedTemplate: any = JSON.stringify(value);
    const splitOne = modifiedTemplate.split('{{');
    splitOne.splice(0, 1); // remove first element
    splitOne.forEach((item: string) => {
      const [customVariable] = item.split('}}');
      modifiedTemplate = modifiedTemplate.replaceAll( '{{' + customVariable + '}}', args[customVariable]);
    });
    return JSON.parse(modifiedTemplate);
  }

}
