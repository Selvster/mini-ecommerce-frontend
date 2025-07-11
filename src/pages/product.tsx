import { useState } from 'react';
import ProductImages from '../components/ProductImages';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useGraphQl';
import { useCartStore } from '../stores/cartStore';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';
import { showToastAlert, toKebabCase } from '../utils';


export default function ProductPage() {
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();
    if (!productId) {
        navigate('/');
        return null;
    }
    const { data, isLoading, isError, error } = useProduct(productId);
    const product = data?.product;

    const sanitizedDescription = product?.description ? DOMPurify.sanitize(product.description) : null;



    const [selectedAttributes, setSelectedAttributes] = useState<{ [attrName: string]: string }>({});

    const handleAttributeSelect = (attrName: string, value: string) => {
        setSelectedAttributes(prev => ({ ...prev, [attrName]: value }));
    };
    const toggleCart = useCartStore((state) => state.toggleCart);
    const addToCart = useCartStore((state) => state.addToCart);
    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, selectedAttributes);
        showToastAlert('success', 'Done !', 'Product added to cart successfully!');
        toggleCart();
    };




    if (isLoading) {
        return (
            <LoadingIndicator msg="Loading product details..." />
        );
    }

    if (isError || !product) {
        return (
            <>
                <Error
                    message={error?.message || 'Failed to load product details.'}
                />
            </>
        );
    }
    return (
        <div className="p-6 relative min-h-screen ">
            <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8">

                <ProductImages product={product} />

                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                        {product.attributes.map(attribute => (
                            <div key={attribute.id} className="mb-6"
                                data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                                <span className="text-sm text-gray-500 block mb-2 font-semibold">{attribute.name.toUpperCase()}:</span>

                                <div className="flex gap-2">
                                    {attribute.items.map(item => {
                                        const isSelected = selectedAttributes[attribute.name] === item.value;

                                        if (attribute.type === 'swatch') {
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleAttributeSelect(attribute.name, item.value)}
                                                    className={`w-8 h-8 border border-gray-300 cursor-pointer
                ${isSelected ? 'ring-1 ring-primary ring-offset-2' : ''}`}
                                                    style={{ backgroundColor: item.value }}
                                                    title={item.displayValue}
                                                    data-testid={`product-attribute-${toKebabCase(attribute.name)}-${item.value}${isSelected ? '-selected' : ''}`}
                                                ></button>
                                            );
                                        } else {
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleAttributeSelect(attribute.name, item.value)}
                                                    className={`px-4 py-2 text-sm font-medium border cursor-pointer
                ${isSelected ? 'bg-dark text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                                    data-testid={`product-attribute-${toKebabCase(attribute.name)}-${item.value}${isSelected ? '-selected' : ''}`}
                                                >
                                                    {item.value}
                                                </button>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        ))}


                        <p className="text-2xl font-bold mb-6">{product.prices[0].currency.symbol}{product.prices[0].amount}</p>

                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock ||
                                Object.keys(selectedAttributes).length < product.attributes.length}
                            className={`w-full  text-white py-3 rounded-md font-semibold text-lg  transition-colors duration-200
                            ${!product.inStock ||
                                    Object.keys(selectedAttributes).length < product.attributes.length
                                    ? 'opacity-50 cursor-not-allowed bg-gray-700' : ' cursor-pointer bg-primary hover:bg-primary-hover'}`}
                            data-testid='add-to-cart'
                        >
                            {!product.inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
                        </button>
                        {sanitizedDescription && (
                            <div className="text-gray-700 leading-relaxed mb-6 mt-2" data-testid='product-description'>
                                {parse(sanitizedDescription)}
                            </div>
                        )}
                    </div>


                </div>
            </div>

        </div>
    );
}
