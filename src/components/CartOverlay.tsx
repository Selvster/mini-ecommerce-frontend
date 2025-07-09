
import { useCartStore } from '../stores/cartStore';
import { usePlaceOrder } from '../hooks/useGraphQl';
import { showToastAlert } from '../utils';
export default function CartOverlay() {
  const isOpen = useCartStore((state) => state.isCartOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const calculateTotal = useCartStore((state) => state.calculateTotal);
  const resetCart = useCartStore((state) => state.reset);

  const { mutate: placeOrder } = usePlaceOrder({
    onSuccess: (_data) => {
      showToastAlert('success', 'Order Placed', 'Your order has been placed successfully!');
      resetCart();
    },
    onError: (error) => {
      showToastAlert('error', 'Order Failed', error?.message || 'Failed to place order. Please try again later.');
    },
  });

  const handlePlaceOrder = () => {

    if (cartItems.length === 0) {
      showToastAlert('error', 'Empty Cart', 'Please add items to your cart before placing an order.');
      return;
    }
    const orderItems = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      selectedAttributes: Object.entries(item.selectedAttributes).map(([name, value]) => ({ name, value }))
    }));

    placeOrder({ items: orderItems });
  };

  return (
    <div
      className={` top-18  h-auto w-100 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 right-5 absolute' : 'translate-x-full right-0 hidden'
        }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 ">My Bag, {cartItems.length} items</h2>
          <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex py-4 border-b border-gray-100 last:border-b-0">
                {/* Product details */}
                <div className="flex-1 pr-4">
                  <h3 className="font-semibold text-gray-800 ">{item.name}</h3>
                  <p className="text-gray-600 ">${item.price.toFixed(2)}</p>

                  {item.attributes.map((attr) => (
                    <div key={attr.id} className="mt-2">
                      <span className="text-sm text-gray-500 block mb-1">
                        {attr.name}:
                      </span>

                      {attr.type === 'text' && (
                        <div className={`inline-flex flex-wrap gap-1 ${attr.items.length > 3 ? 'w-full' : ''}`}>
                          {attr.items.map((textItem) => (
                            <span
                              key={textItem.id}
                              className={`w-auto p-2 h-8 flex items-center justify-center text-xs font-medium border border-gray-300 rounded-md
              ${item.selectedAttributes[attr.name] === textItem.value ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`
                              }
                            >
                              {textItem.displayValue}
                            </span>
                          ))}
                        </div>
                      )}

                      {attr.type === 'swatch' && (
                        <div className="inline-flex gap-1 pl-1">
                          {attr.items.map((swatchItem) => (
                            <span
                              key={swatchItem.id}
                              className={`w-6 h-6 rounded-full border border-gray-300
              ${item.selectedAttributes[attr.name] === swatchItem.value ? 'ring-2 ring-green-500 ring-offset-1' : ''}`
                              }
                              style={{ backgroundColor: swatchItem.value }}
                            ></span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}


                </div>

                <div className="flex flex-col items-center justify-between ml-4">
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                  <span className="my-2 text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-md"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-lg font-bold mb-4">
            <span className=''>Total</span>
            <span>${calculateTotal()}</span>
          </div>
          <button
            onClick={
              () => {
                handlePlaceOrder();
              }
            }
            className={`w-full text-white py-3 rounded-md font-semibold transition-colors
              ${cartItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 cursor-pointer'
              }`
            }
            disabled={cartItems.length === 0}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
