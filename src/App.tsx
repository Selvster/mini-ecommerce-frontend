import Header from './components/Header';
import CartOverlay from './components/CartOverlay';
import AppRoutes from './routes';
import { useLocation, matchPath } from 'react-router-dom';
import { useState } from 'react';
import { useCartStore } from './stores/cartStore';


export default function App() {
    const location = useLocation();
    const match = matchPath('/:categoryName', location.pathname);
    const [defaultCategory, setDefaultCategory] = useState<string>('');
    const categoryName = match?.params?.categoryName || defaultCategory;
    const isCartOpen = useCartStore((state) => state.isCartOpen);




    return (
        <div className="font-raleway text-gray-800 relative pt-2.5">
            <Header categoryName={categoryName} setDefaultCategory={setDefaultCategory} />
            <div className="relative">
                <AppRoutes />
                <CartOverlay />

                {isCartOpen && (
                    <div className="absolute inset-0 bg-black/20 z-40 transition-opacity duration-300"></div>
                )}
            </div>

        </div>
    );
}