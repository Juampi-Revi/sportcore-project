import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaBox,
    FaChartBar,
    FaCog,
    FaDesktop,
    FaMobile,
    FaShoppingCart,
    FaTags,
    FaUsers
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Funciones de administración disponibles
  const adminFunctions = [
    {
      id: 'products',
      title: t('admin.functions.productManagement.title'),
      description: t('admin.functions.productManagement.description'),
      icon: FaBox,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/products',
      available: true // CRUD completo implementado
    },
    {
      id: 'categories',
      title: t('admin.functions.categoryManagement.title'),
      description: t('admin.functions.categoryManagement.description'),
      icon: FaTags,
      color: 'from-green-500 to-green-600',
      href: '/admin/categories',
      available: true // CRUD completo implementado
    },
    {
      id: 'users',
      title: t('admin.functions.userManagement.title'),
      description: t('admin.functions.userManagement.description'),
      icon: FaUsers,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/users',
      available: false
    },
    {
      id: 'orders',
      title: t('admin.functions.orderManagement.title'),
      description: t('admin.functions.orderManagement.description'),
      icon: FaShoppingCart,
      color: 'from-orange-500 to-orange-600',
      href: '/admin/orders',
      available: false
    },
    {
      id: 'analytics',
      title: t('admin.functions.analytics.title'),
      description: t('admin.functions.analytics.description'),
      icon: FaChartBar,
      color: 'from-indigo-500 to-indigo-600',
      href: '/admin/analytics',
      available: false
    },
    {
      id: 'settings',
      title: t('admin.functions.settings.title'),
      description: t('admin.functions.settings.description'),
      icon: FaCog,
      color: 'from-gray-500 to-gray-600',
      href: '/admin/settings',
      available: false
    }
  ];

  // Si es móvil, mostrar mensaje de no disponible
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaMobile className="text-white text-3xl" />
          </div>
          
          <h1 className="text-2xl font-black text-gray-900 mb-4">
            {t('admin.mobile.title')}
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {t('admin.mobile.message')}
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
            <FaDesktop className="text-lg" />
            <span>{t('admin.mobile.recommendation')}</span>
          </div>
          
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent mb-2">
                {t('admin.title')}
              </h1>
              <p className="text-gray-600 text-lg">
                {t('admin.subtitle')}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaCog className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Quick Actions */}
        <div className="mb-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent mb-6">{t('admin.quickActions')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/products/add"
              className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm text-gray-700 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-primary-300/50 group"
            >
              <FaBox className="text-xl text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">{t('admin.newProduct')}</span>
            </Link>
            
            <Link
              to="/admin/categories/add"
              className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm text-gray-700 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-primary-300/50 group"
            >
              <FaTags className="text-xl text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">{t('admin.newCategory')}</span>
            </Link>
            
            <Link
              to="/admin/products"
              className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm text-gray-700 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-primary-300/50 group"
            >
              <FaBox className="text-xl text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">{t('admin.manageProducts')}</span>
            </Link>
            
            <Link
              to="/admin/categories"
              className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm text-gray-700 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-primary-300/50 group"
            >
              <FaTags className="text-xl text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">{t('admin.manageCategories')}</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t('admin.stats.activeProducts')}</p>
                <p className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-300">3</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-2xl flex items-center justify-center group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all duration-300">
                <FaBox className="text-primary-600 text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t('admin.stats.categories')}</p>
                <p className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-300">3</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-2xl flex items-center justify-center group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all duration-300">
                <FaTags className="text-primary-600 text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t('admin.stats.functions')}</p>
                <p className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-300">6</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-2xl flex items-center justify-center group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all duration-300">
                <FaCog className="text-primary-600 text-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Admin Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminFunctions.map((func) => {
            const IconComponent = func.icon;
            return (
              <div
                key={func.id}
                className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden ${
                  func.available 
                    ? 'cursor-pointer hover:-translate-y-2 hover:scale-[1.02]' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                
                {/* Hover gradient overlay */}
                {func.available && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                )}
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:from-primary-500/20 group-hover:to-primary-600/20 group-hover:scale-110 transition-all duration-500">
                    <IconComponent className="text-primary-600 text-2xl group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-300">
                    {func.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {func.description}
                  </p>
                  
                  {/* Status and Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        func.available ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm font-medium ${
                        func.available ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {func.available ? t('admin.status.available') : t('admin.status.comingSoon')}
                      </span>
                    </div>
                    
                    {func.available ? (
                      <Link
                        to={func.href}
                        className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      >
                        <span>{t('admin.actions.access')}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-sm font-medium">
                        {t('admin.status.inDevelopment')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
