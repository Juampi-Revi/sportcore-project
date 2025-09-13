import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaDumbbell } from 'react-icons/fa';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 border-t border-primary-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Block - Logo and Copyright */}
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            {/* Isologo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <FaDumbbell className="text-white text-sm" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">SportCore</span>
                <span className="text-gray-400 text-xs">
                  {t('header.tagline')}
                </span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {currentYear} SportCore. {t('footer.allRightsReserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
