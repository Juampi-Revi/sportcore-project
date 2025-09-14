import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder,
  className = "" 
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={placeholder || t('home.searchPlaceholder')}
        className="w-full px-8 py-5 pr-16 text-gray-900 rounded-2xl text-xl focus:outline-none focus:ring-4 focus:ring-primary-500/20 shadow-2xl border border-gray-200 font-medium"
      />
      <button 
        type="submit"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-500 transition-colors duration-300"
      >
        <FaSearch className="text-2xl" />
      </button>
    </form>
  );
};

export default SearchBar;
