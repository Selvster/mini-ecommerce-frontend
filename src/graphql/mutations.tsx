
export const PLACE_ORDER_MUTATION = `
  mutation PlaceNewOrder($input: OrderInput!) {
    placeOrder(input: $input) {
      orderId
      totalAmount
      currency {
        label
        symbol
      }
      message
    }
  }
`;