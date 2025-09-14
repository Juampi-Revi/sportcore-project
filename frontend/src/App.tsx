import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

// Components
import Footer from './components/organisms/Footer';
import Header from './components/organisms/Header';

// Contexts
import { CartProvider } from './contexts/CartContext';

// Pages
import AddProduct from './pages/AddProduct';
// import Admin from './pages/Admin';
// import AdminProducts from './pages/AdminProducts';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

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
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
            {/* <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/edit/:id" element={<AddProduct />} /> */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
