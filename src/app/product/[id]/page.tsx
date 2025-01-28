import { Metadata } from 'next';
import ProductDetails from '@/app/components/ProductDetails';
import { fetchProductById } from './hooks';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
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
            images: [product.image],
            url: `https://localhost:3000/product/${id}`,
            type: 'website',
        },
    };
}


export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    return <ProductDetails productId={id} />;
}