export interface IShippingDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
        apartment?: string;
        street: string;
        suburb: string;
        province: string;
        country: string;
        code: string;
    };
}