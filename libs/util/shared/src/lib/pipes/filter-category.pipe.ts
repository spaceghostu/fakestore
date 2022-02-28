import { Pipe, PipeTransform } from '@angular/core';
import { Categories, IProductEntity } from '@fakestore/data';

@Pipe({
  name: 'filterCategory',
  pure: false
})

export class FilterCategoryPipe implements PipeTransform {
  transform(items: IProductEntity[], category: Categories): IProductEntity[] {
    if (!category || !category.length) return items;
    return items.filter(item => item.category === category);
  }
}