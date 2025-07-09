import Header from './components/Header';
import CartOverlay from './components/CartOverlay';
import AppRoutes from './routes';
import { useLocation, matchPath } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
    const location = useLocation();
    const match = matchPath('/category/:categoryName', location.pathname);
    const [defaultCategory, setDefaultCategory] = useState<string>('');
    const categoryName = match?.params?.categoryName || defaultCategory;



    return (
        <div className="font-raleway text-gray-800 relative p-2.5">
            <Header categoryName={categoryName} setDefaultCategory={setDefaultCategory}/>

            <AppRoutes />

            <CartOverlay />
        </div>
    );
}