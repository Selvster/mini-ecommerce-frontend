import { Routes, Route } from 'react-router-dom';

import AllProducts from './pages/index';
import Product from './pages/product';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AllProducts/>} />
            <Route path="/category/:categoryName" element={<AllProducts />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="*" element={<div className="text-center py-8 text-xl ">Page Not Found</div>} />
        </Routes>
    );
}
