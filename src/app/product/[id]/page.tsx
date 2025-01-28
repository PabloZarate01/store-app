import { Metadata } from 'next';
import ProductDetails from '@/app/components/ProductDetails';
import { fetchProductById } from './hooks';
interface ProductPageParams {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
    const id = (await params).id;

    const product = await fetchProductById(id);

    if (!product) {
        return {
            title: 'Product Not Found',
            description: 'This product does not exist.',
        };
    }

    return {
        title: `${product.title} | Store App`,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            images: [
                {
                    url: product.image,
                    alt: product.title,
                },
            ],
            url: `${process.env.NEXT_PUBLIC_APP_URL}/product/${id}`,
            type: 'website',
        },
    };
}

export default async function ProductPage({ params }: ProductPageParams) {
    const id = (await params).id;

    return <ProductDetails productId={id} />;
}