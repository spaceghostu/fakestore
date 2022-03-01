import { Categories, IProductEntity } from '@fakestore/data';

export const createProductEntity = (
    id: number,
    title = '',
    price = 49.50,
    category = Categories.JEWELRY
) => ({
    id,
    title: title || `name-${id}`,
    price: price,
    description: `description for item-${id}`,
    category: category,
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: {
        rate: 3.5,
        count: 250,
    }
} as IProductEntity);