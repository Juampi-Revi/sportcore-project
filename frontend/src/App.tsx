import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

// Components
import Footer from './components/organisms/Footer';
import Header from './components/organisms/Header';

// Pages
// import AddProduct from './pages/AddProduct';
// import Admin from './pages/Admin';
// import AdminProducts from './pages/AdminProducts';
// import Home from './pages/Home';
// import ProductDetail from './pages/ProductDetail';
// import Products from './pages/Products';

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLanguageChange={changeLanguage} />
      
      <main className="flex-1 pt-16">
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<AddProduct />} /> */}
          <Route path="/" element={
            <div className="p-8 text-center">
              <h1 className="text-4xl font-bold text-primary-500 mb-4">SportCore</h1>
              <p className="text-xl text-gray-600 mb-8">Potencia desde el centro</p>
              <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
                <h2 className="text-2xl font-semibold mb-4">¡Proyecto en Desarrollo!</h2>
                <p className="text-gray-700">Estamos construyendo la mejor plataforma de suplementos deportivos.</p>
                <p className="text-sm text-gray-500 mt-4">Backend: ✅ Configurado | Frontend: ✅ Configurado</p>
                <p className="text-sm text-gray-500 mt-2">Header: ✅ Implementado | Footer: ✅ Implementado</p>
              </div>
            </div>
          } />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
