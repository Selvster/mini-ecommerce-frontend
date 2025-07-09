import { useState } from 'react';
import type { ProductCardProps } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { showToastAlert } from '../utils';

const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`relative bg-white p-2 rounded-md overflow-hidden cursor-pointer ${isHovered ? 'shadow-md' : ''}`}
      data-testid={`product-${product.name.replace(/\s+/g, '-').toLowerCase()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
    >
      <div className="relative">
        <img
          src={product.gallery[0].imageUrl}
          alt={product.name}
          className='w-full h-auto min-h-[300px] max-h-[350px] object-contain rounded-md'
        />

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500/[.40] rounded-md">
            <span className="text-gray-500 text-lg font-medium tracking-wide">OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className="mt-2 pl-2 p-3">
        <p className="text-base  font-normal ">{product.name}</p>
        <p className="text-base font-semibold ">{product.prices[0].currency.symbol}{product.prices[0].amount}</p>
      </div>

      {product.inStock && (
        <button
          onClick={
            (e) => {
              e.stopPropagation();
              const attributes = product.attributes;

              const selectedAttributes = attributes.reduce<Record<string, string>>((acc, attr) => {
                acc[attr.name] = attr.items[0].value;
                return acc;
              }, {});

              addToCart(product, selectedAttributes)
              showToastAlert('success', 'Done !', 'Product added to cart successfully!');
            }
          }
          className={`cursor-pointer absolute bottom-16 right-4 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-primary-hover transition-all duration-300 ease-in-out
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
            <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ProductCard;
