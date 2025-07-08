
import ProductGrid from '../components/ProductGrid';
import { useParams } from 'react-router-dom';

export default function Products() {
    const { categoryName } = useParams<{ categoryName?: string }>();
    return (<>

        <ProductGrid currentCategory={categoryName || 'all'} />

    </>
    );
}
