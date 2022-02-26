import { IProductEntity } from './product.model';

export interface ICartItem extends IProductEntity {
  quantity: number;
}
