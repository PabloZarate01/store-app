export type IProduct = {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    };
    image: string;
};
