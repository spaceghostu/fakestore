import { IProductEntity } from '@fakestore/data';

const randomFloat = (min: number, max: number, decimals = 2): number => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};
const randomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};
const randomCategory = (): string => {
    const categories = [
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
    ];
    const randomIndex = randomInt(0, 3);
    return categories[randomIndex];
};

export const createProductEntity = (id: number, title = '') =>
({
    id,
    title: title || `name-${id}`,
    price: randomFloat(0, 200),
    description: `description for item-${id}`,
    category: randomCategory(),
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: {
        rate: randomFloat(0, 5, 1),
        count: randomInt(0, 200),
    }
} as IProductEntity);