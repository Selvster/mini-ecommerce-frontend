import ProductCard from './ProductCard';

import type { ProductGridProps } from '../types';
import { useProducts } from '../hooks/useGraphQl';
import LoadingIndicator from './LoadingIndicator';
import Error from './Error';

export default function ProductGrid({ currentCategory }: ProductGridProps) {
  const { data: productsData, isLoading, isError, error, isFetching } = useProducts(currentCategory);
  let products = productsData?.products || [];


  if (isLoading || isFetching) {
    return (
      <LoadingIndicator msg={`Loading products...`}/>
    );
  }

  if (isError) {
    return (
      <Error message={error?.message || 'Failed to load products.'} />
    );
  }

  return (
    <div className="p-6 relative">
      <h2 className="text-4xl font-semibold mb-6 ">{currentCategory.toUpperCase()}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {
          products.length === 0 && (
            <div className="col-span-3 text-center text-gray-500">
              No products found in this category.
            </div>
          )
        }
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

 
    </div>
  );
}
