import { useQuery, useMutation  } from '@tanstack/react-query';
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { rawGraphqlRequest } from '../graphqlClient'; 

import { ALL_CATEGORIES_QUERY, ALL_PRODUCTS_QUERY, PRODUCT_BY_ID_QUERY } from '../graphql/queries';
import { PLACE_ORDER_MUTATION } from '../graphql/mutations';
import type {
  Category,
  Product,
} from '../types'; 


/**
 * Hook to fetch all categories.
 */
export function useCategories(
  options?: UseQueryOptions<
    { categories: Category[] },
    Error,
    { categories: Category[] },
    string[]
  >
) {
  return useQuery<
    { categories: Category[] },
    Error,
    { categories: Category[] },
    string[]
  >({
    queryKey: ['categories'],
    queryFn: async () => {
      return rawGraphqlRequest<{ categories: Category[] }>(ALL_CATEGORIES_QUERY);
    },
    ...options,
  });
}

/**
 * Hook to fetch all products with details.
 */
export function useProducts(
  categoryName?: string, // <-- NEW: Optional categoryName parameter
  options?: UseQueryOptions<
    { products: Product[] },
    Error,
    { products: Product[] },
    (string | undefined)[] // <-- Update queryKey type to include undefined
  >
) {
  return useQuery<
    { products: Product[] },
    Error,
    { products: Product[] },
    (string | undefined)[]
  >({
    queryKey: ['products', categoryName], // <-- Query key now includes categoryName
    queryFn: async () => {
      return rawGraphqlRequest<{ products: Product[] }>(ALL_PRODUCTS_QUERY, { category: categoryName === 'all' ? undefined : categoryName });
    },
    placeholderData: (previousData, _previousQuery) => previousData, 
    ...options,
  });
}

/**
 * Hook to fetch a single product by ID.
 * @param productId The ID of the product to fetch.
 */
export function useProduct(
  productId: string,
  options?: UseQueryOptions<
    { product: Product },
    Error,
    { product: Product },
    (string | number)[]
  >
) {
  return useQuery<
    { product: Product },
    Error,
    { product: Product },
    (string | number)[]
  >({
    queryKey: ['product', productId], // Query key includes the product ID
    queryFn: async () => {
      return rawGraphqlRequest<{ product: Product }>(PRODUCT_BY_ID_QUERY, { id: productId });
    },
    enabled: !!productId,
    ...options,
  });
}

// /**
//  * Hook to place a new order.
//  */
// export function usePlaceOrder(
//   options?: UseMutationOptions<PlaceOrderResult, Error, PlaceOrderInput>
// ) {
//   return useMutation<PlaceOrderResult, Error, PlaceOrderInput>({
//     mutationFn: async (input: PlaceOrderInput) => {
//       return rawGraphqlRequest<PlaceOrderResult>(PLACE_ORDER_MUTATION, { input });
//     },
//     ...options,
//   });
// }