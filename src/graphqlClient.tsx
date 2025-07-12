import axios from 'axios';


interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; [key: string]: any }>;
}

/**
 *
 * @param query The GraphQL query string.
 * @param variables Optional variables for the query.
 * @returns A Promise resolving to the GraphQL response data.
 */
export async function rawGraphqlRequest<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const response = await axios.post<GraphQLResponse<T>>(
      import.meta.env.VITE_GRAPHQL_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data;

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(result.errors.map(err => err.message).join(', '));
    }

    if (!result.data) {
      throw new Error('No data received from GraphQL API');
    }

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios GraphQL Request Failed:', error.message, error.response?.data);
      throw new Error(`Network Error: ${error.message} - ${JSON.stringify(error.response?.data?.errors || error.response?.data || '')}`);
    } else {
      console.error('Unexpected GraphQL Request Error:', error);
      throw error;
    }
  }
}