import { IShippingDetails } from '@fakestore/data';


export const createShippingDetails = (): IShippingDetails => ({
    firstName: 'John',
    lastName: 'Smith',
    email: 'johnsmith@email.com',
    phone: '012356789',
    address: {
        apartment: '12',
        street: '34 Street St',
        suburb: 'Townsville',
        province: 'Province',
        country: 'South Africa',
        code: '0123',
    }
});


export const createEmptyShippingDetails = (): IShippingDetails => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
        apartment: '',
        street: '',
        suburb: '',
        province: '',
        country: '',
        code: '',
    }
});