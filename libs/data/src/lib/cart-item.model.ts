import { IProductEntity } from './product.model';

export interface ICartItem extends IProductEntity {
  quantity: number;
}


export class CartItem implements ICartItem {
  id = '';
  title = '';
  price = 0;
  quantity = 0;
  description = '';
  category = '';
  image = '';
  rating = {
    rate: 0,
    count: 0,
  };
}