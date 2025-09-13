import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const { t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Block - Logo and Tagline */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-500 font-bold text-xl">SC</span>
              </div>
              {/* Brand Name and Tagline */}
              <div className="flex flex-col">
                <h1 className="text-white font-bold text-xl leading-tight">
                  SportCore
                </h1>
                <p className="text-primary-200 text-xs leading-tight">
                  {t('header.tagline')}
                </p>
              </div>
            </div>
          </Link>

          {/* Right Block - Navigation and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleLanguageChange('es')}
                className="text-white hover:text-primary-200 text-sm font-medium transition-colors"
              >
                ES
              </button>
              <span className="text-primary-300">|</span>
              <button
                onClick={() => handleLanguageChange('en')}
                className="text-white hover:text-primary-200 text-sm font-medium transition-colors"
              >
                EN
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                to="/register"
                className="text-white hover:text-primary-200 text-sm font-medium transition-colors"
              >
                {t('header.createAccount')}
              </Link>
              <Link
                to="/login"
                className="bg-white text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {t('header.signIn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
