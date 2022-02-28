import { Pipe, PipeTransform } from '@angular/core';
import { IProductEntity } from '@fakestore/data';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {
  transform(items: IProductEntity[], query: string): IProductEntity[] {
    if (!query || !query.length) return items;
    return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  }
}