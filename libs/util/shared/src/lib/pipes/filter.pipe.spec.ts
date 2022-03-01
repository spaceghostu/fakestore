import { FilterPipe } from './filter.pipe';
import { createProductEntity } from '@fakestore/util/testing';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter products list by a query', () => {
    const items = [
      createProductEntity(0, 'mens jeans'),
      createProductEntity(1, 'womens jeans'),
      createProductEntity(2, 'shirt'),
    ];
    const query = 'jean';
    expect(pipe.transform(items, query).length).toBe(2);
  });

});
