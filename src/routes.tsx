import { Routes, Route } from 'react-router-dom';

import AllProducts from './pages/index';
import Product from './pages/product';
import NotFound from './pages/404';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="/category/:categoryName" element={<AllProducts />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
