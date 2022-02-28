import { createProductEntity } from './mock.products';

export const createCartItem = (id: number, title = '', quantity = 1, price = 0) =>
({
    ...createProductEntity(id, title, price),
    quantity

});