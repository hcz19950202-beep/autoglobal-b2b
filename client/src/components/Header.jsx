import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX, HiGlobeAlt, HiChevronDown } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const { t, lang, switchLanguage, languages } = useLanguage();
  const langRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.vehicles'), path: '/vehicles' },
    { name: t('nav.compare'), path: '/compare' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-none">AutoGlobal</span>
              <span className="text-[10px] md:text-xs font-bold text-primary tracking-widest uppercase">China Export</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 text-gray-600 hover:text-primary px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <HiGlobeAlt className="w-5 h-5" />
                <span className="text-sm font-medium">{languages[lang]?.flag} {languages[lang]?.name}</span>
                <HiChevronDown className={`w-3.5 h-3.5 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 py-1 min-w-[160px] z-50">
                  {Object.entries(languages).map(([code, info]) => (
                    <button
                      key={code}
                      onClick={() => { switchLanguage(code); setIsLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                        lang === code ? 'text-primary font-bold bg-blue-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{info.flag}</span>
                      <span>{info.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className="btn-primary text-sm">
              {t('nav.getQuote')}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                location.pathname === link.path 
                  ? 'text-primary bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t mt-3">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">{t('nav.language')}</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(languages).map(([code, info]) => (
                <button
                  key={code}
                  onClick={() => { switchLanguage(code); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    lang === code 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{info.flag}</span>
                  <span>{info.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Link to="/contact" className="btn-primary w-full text-center block">
              {t('nav.getQuote')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
