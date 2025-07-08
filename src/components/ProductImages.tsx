import  { useState, useEffect } from 'react';
import type { Product } from '../types';

export default function ProductImages({ product }: { product : Product}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (product && product.gallery.length > 0) {
      setCurrentImageIndex(0); 
    }
  }, [product]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.gallery.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const mainImageSrc = product.gallery[currentImageIndex]?.imageUrl;

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0">
        {product.gallery.map((item, index: number) => (
          <img
            key={index}
            src={item.imageUrl}
            alt={`${product.name} thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${currentImageIndex === index ? 'border-green-500' : 'border-transparent'}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <img
          src={mainImageSrc}
          alt={product.name}
          className="w-full max-w-md object-cover rounded-lg shadow-md"
        />

        <button
          onClick={goToPreviousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black p-2  text-white hover:bg-neutral-800 focus:outline-none"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>

        <button
          onClick={goToNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black p-2 shadow-md text-white hover:bg-neutral-800 focus:outline-none"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
