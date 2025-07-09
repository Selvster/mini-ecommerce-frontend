// Query to fetch all categories
export const ALL_CATEGORIES_QUERY = `
  query AllCategories {
    categories {
      id
      name
    }
  }
`;

// Query to fetch all products with all their details
export const ALL_PRODUCTS_QUERY = `
  query Products($category: String) { 
          products(category: $category) {
            id
            name
            inStock
            category {
              id
              name
            }
            gallery {
              imageUrl
            }
            prices {
              amount
              currency {
                label
                symbol
              }
            }
            attributes {
              id
              name
              type
              items {
                id
                displayValue
                value
              }
            }
          }
        }
`;

// Query to fetch a single product by its ID
export const PRODUCT_BY_ID_QUERY = `
  query ProductById($id: ID!) {
    product(id: $id) {
      id
      name
      inStock
      description
      gallery {
        imageUrl
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;
