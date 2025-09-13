import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitchProps {
  onLanguageChange?: (language: string) => void;
  className?: string;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ 
  onLanguageChange, 
  className = "" 
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-3 py-1 text-sm font-medium rounded-l-lg transition-colors ${
          currentLanguage === 'es'
            ? 'bg-primary-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 text-sm font-medium rounded-r-lg transition-colors ${
          currentLanguage === 'en'
            ? 'bg-primary-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitch;
