import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBolt, FaBurn, FaDna, FaDumbbell, FaFire, FaLeaf, FaRedo, FaStar, FaThLarge } from 'react-icons/fa';
import { GiEnergyArrow, GiMuscleUp } from 'react-icons/gi';
import ProductCard from '../components/molecules/ProductCard';
import SearchBar from '../components/molecules/SearchBar';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tight">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <SearchBar 
              onSearch={(query) => console.log('Search:', query)}
              className="shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-500 rounded-full">
                <FaFire className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {t('home.featuredProducts')}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {/* Featured products */}
            {[
              { id: 1, name: 'Whey Protein Premium', description: 'Proteína de suero de leche de alta calidad para maximizar tu rendimiento', price: 89.99 },
              { id: 2, name: 'Creatina Monohidrato', description: 'Creatina pura para aumentar la fuerza y masa muscular', price: 29.99 },
              { id: 3, name: 'Pre-entreno Explosivo', description: 'Fórmula energética para entrenamientos intensos', price: 49.99 },
              { id: 4, name: 'Multivitamínico Completo', description: 'Complejo vitamínico para deportistas activos', price: 39.99 }
            ].map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                onAddToCart={(id) => console.log('Add to cart:', id)}
                onViewDetails={(id) => console.log('View details:', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-500 rounded-full">
                <FaThLarge className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {t('home.categories')}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: 'Proteínas', icon: FaDumbbell, color: 'text-blue-500' },
              { name: 'Creatina', icon: GiMuscleUp, color: 'text-purple-500' },
              { name: 'Pre-entreno', icon: FaBolt, color: 'text-yellow-500' },
              { name: 'Vitaminas', icon: FaLeaf, color: 'text-green-500' },
              { name: 'Aminoácidos', icon: FaDna, color: 'text-pink-500' },
              { name: 'Quemadores', icon: FaBurn, color: 'text-red-500' },
              { name: 'Recuperación', icon: FaRedo, color: 'text-indigo-500' },
              { name: 'Energía', icon: GiEnergyArrow, color: 'text-orange-500' }
            ].map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group border border-gray-100">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className={`text-5xl mb-6 ${category.color} group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                      <IconComponent />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-500 rounded-full">
                <FaStar className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {t('home.recommendations')}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaStar className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Recomendación {item}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Descripción de la recomendación número {item}. 
                  Este producto ha sido seleccionado especialmente para ti.
                </p>
                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                  Ver Producto
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
