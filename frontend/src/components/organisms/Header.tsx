import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaDumbbell, FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import LanguageSwitch from '../molecules/LanguageSwitch';

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const { t } = useTranslation();
  const { state } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-primary-500/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Block - Logo and Tagline */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaDumbbell className="text-white text-lg" />
              </div>
              {/* Brand Name and Tagline */}
              <div className="flex flex-col">
                <h1 className="text-white font-black text-xl leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  SportCore
                </h1>
                <p className="text-gray-400 text-xs leading-tight">
                  {t('header.tagline')}
                </p>
              </div>
            </div>
          </Link>

          {/* Center Block - Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-primary-400 transition-colors duration-300 font-medium"
            >
              {t('navigation.home')}
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-primary-400 transition-colors duration-300 font-medium"
            >
              {t('navigation.products')}
            </Link>
            <Link
              to="/categories"
              className="text-white hover:text-primary-400 transition-colors duration-300 font-medium"
            >
              {t('navigation.categories')}
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-primary-400 transition-colors duration-300 font-medium"
            >
              {t('navigation.about')}
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-primary-400 transition-colors duration-300 font-medium"
            >
              {t('navigation.contact')}
            </Link>
            <Link
              to="/administracion"
              className="text-white hover:text-primary-400 transition-colors duration-300 font-medium"
            >
              {t('navigation.admin')}
            </Link>
          </nav>

          {/* Right Block - Cart, Language and Auth */}
          <div className="flex items-center space-x-4">
            {/* Language Switch */}
            <LanguageSwitch onLanguageChange={onLanguageChange} />

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-2 text-white hover:text-primary-400 transition-colors duration-300"
            >
              <FaShoppingCart className="text-lg" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {state.totalItems > 99 ? '99+' : state.totalItems}
                </span>
              )}
            </Link>

            {/* Sign In Button */}
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              <FaSignInAlt className="text-sm" />
              <span>{t('header.signIn')}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
