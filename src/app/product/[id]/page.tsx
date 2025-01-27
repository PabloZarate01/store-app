import { Metadata } from 'next';
import ProductDetails from '@/app/components/ProductDetails'; // Componente del cliente

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const res = await fetch(`http://localhost:3001/products/${params.id}`);
    const product = await res.json();

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
            url: `https://localhost:3000/product/${params.id}`,
            type: 'website',
        },
    };
}

export default function ProductPage({ params }: { params: { id: string } }) {
    return <ProductDetails productId={params.id} />;
}