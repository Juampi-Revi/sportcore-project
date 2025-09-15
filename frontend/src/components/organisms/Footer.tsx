import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaArrowRight,
    FaAward,
    FaClock,
    FaDumbbell,
    FaEnvelope,
    FaFacebook,
    FaHeadset,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhone,
    FaShieldAlt,
    FaTruck,
    FaTwitter,
    FaYoutube
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaDumbbell className="text-white text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">SportCore</span>
                <span className="text-gray-400 text-sm">
                  {t('header.tagline')}
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.description')}
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="YouTube"
              >
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <FaArrowRight className="w-3 h-3 mr-2" />
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <FaArrowRight className="w-3 h-3 mr-2" />
                  {t('navigation.products')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <FaArrowRight className="w-3 h-3 mr-2" />
                  {t('navigation.categories')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <FaArrowRight className="w-3 h-3 mr-2" />
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <FaArrowRight className="w-3 h-3 mr-2" />
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t('footer.customerService')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/shipping" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <FaTruck className="w-3 h-3 mr-2" />
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <FaShieldAlt className="w-3 h-3 mr-2" />
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <FaHeadset className="w-3 h-3 mr-2" />
                  {t('footer.support')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <FaAward className="w-3 h-3 mr-2" />
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t('footer.contactInfo')}
            </h3>
            
            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {t('footer.address')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {t('footer.phone')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {t('footer.email')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock className="text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {t('footer.hours')}
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-white mb-2">
                {t('footer.newsletter')}
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletterPlaceholder')}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                  {t('footer.subscribe')}
                  <FaArrowRight className="ml-2 text-xs" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} SportCore. {t('footer.allRightsReserved')}
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-end space-x-6">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                {t('footer.privacy')}
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                {t('footer.terms')}
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
              >
                {t('footer.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
