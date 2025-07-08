import Header from './components/Header';
import CartOverlay from './components/CartOverlay';
import AppRoutes from './routes';
import { useLocation, matchPath } from 'react-router-dom';

export default function App() {
    const location = useLocation();
    const match = matchPath('/category/:categoryName', location.pathname);
    const categoryName = match?.params?.categoryName || 'all';



    return (
        <div className="font-raleway text-gray-800 relative p-2.5">
            <Header categoryName={categoryName}/>

            <AppRoutes />

            <CartOverlay />
        </div>
    );
}