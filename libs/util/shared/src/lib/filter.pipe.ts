import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], query: string): any {
    if (!query || !query.length) return items;
    return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  }
}