
import logo from '../assets/imgs/logo.png';
import type { HeaderProps } from '../types';
import { useCategories } from '../hooks/useGraphQl';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
export default function Header({ categoryName }: HeaderProps) {
    const toggleCart = useCartStore((state) => state.toggleCart);
    const cartItemCount = useCartStore((state) => state.cartItems.length);

    const { data: categoriesData, isLoading, isError, error } = useCategories();


    if (isError) {
        return <div className="text-center py-4 text-xl text-red-500 ">Error: {error?.message || 'Failed to load categories.'}</div>;
    }
    const categories = categoriesData?.categories || [];
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white ">
            <nav className="flex gap-8 text-base font-semibold">
                {
                    isLoading && (
                        <div className="text-gray-500">Loading categories...</div>
                    )
                }
                {categories.map((category) => (
                    <Link to={`/category/${category.name}`}
                        key={category.name}
                        className={"text-gray-700 hover:text-primary-hover pb-2 " + (categoryName === category.name ? " text-primary border-b-2 border-primary" : "")}
                    >
                        {category.name.toUpperCase()}
                    </Link>
                ))}
            </nav>

            <div className="hidden md:flex items-center justify-center flex-grow">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <img src={logo} alt="Logo" className="w-6 h-6" />
                </div>
            </div>

            <div className="flex items-center gap-6">


                <div className="relative text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={toggleCart} title="View Cart" aria-label="View Cart" role="button" tabIndex={0}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                        <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {cartItemCount}
                    </span>
                </div>
            </div>
        </header>
    );
}
