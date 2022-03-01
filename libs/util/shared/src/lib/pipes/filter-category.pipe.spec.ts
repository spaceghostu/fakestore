import { Categories } from '@fakestore/data';
import { createProductEntity } from '@fakestore/util/testing';
import { FilterCategoryPipe } from './filter-category.pipe';

describe('FilterCategoryPipe', () => {
  const pipe = new FilterCategoryPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter products list by category', () => {
    const items = [
      createProductEntity(0, 'mens jeans', 0, Categories.MENS_CLOTHING),
      createProductEntity(1, 'womens jeans', 0, Categories.WOMENS_CLOTHING),
      createProductEntity(2, 'shirt', 0, Categories.MENS_CLOTHING),
    ];
    const category = Categories.MENS_CLOTHING;
    expect(pipe.transform(items, category).length).toBe(2);
  });
});
