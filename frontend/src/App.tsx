import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

// Components
import Footer from './components/organisms/Footer';
import Header from './components/organisms/Header';

// Contexts
import { CartProvider } from './contexts/CartContext';

// Pages
import AddProduct from './pages/AddProduct';
import AdminCategories from './pages/AdminCategories';
import AdminPanel from './pages/AdminPanel';
import AdminProducts from './pages/AdminProducts';
// import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header onLanguageChange={changeLanguage} />
        
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/administracion" element={<AdminPanel />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/admin/products/edit/:id" element={<AddProduct />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
