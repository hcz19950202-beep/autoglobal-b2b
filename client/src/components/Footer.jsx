import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const Footer = () => {
  const { t } = useLanguage();
  const { config, getWhatsAppUrl } = useSiteConfig();
  const currentYear = new Date().getFullYear();

  const brands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Nissan', 'Hyundai', 'Ford', 'Audi'];
  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('footer.inventory'), path: '/vehicles' },
    { name: t('footer.aboutUs'), path: '/about' },
    { name: t('footer.contactUs'), path: '/contact' },
    { name: t('footer.exportGuide'), path: '/about' },
  ];

  return (
    <footer className="bg-[#1a1a2e] text-gray-300 hidden md:block">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">AutoGlobal</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><FaLinkedin size={20} /></a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaWhatsapp size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider">{t('footer.popularBrands')}</h4>
            <div className="grid grid-cols-2 gap-4">
              {brands.map((brand) => (
                <Link key={brand} to={`/vehicles?brand=${brand}`} className="hover:text-primary transition-colors">
                  {brand}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider">{t('footer.contactInfo')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-primary flex-shrink-0" />
                <span>{config.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="mt-1 text-primary flex-shrink-0" />
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-primary">+{config.whatsapp.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-primary flex-shrink-0" />
                <a href={`mailto:${config.contact.email}`} className="hover:text-primary">{config.contact.email}</a>
              </li>
              <li className="text-gray-400 mt-4 italic">
                {t('footer.officeHours')}
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 py-8 flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
           <span className="text-lg font-bold">SGS CERTIFIED</span>
           <span className="text-lg font-bold">ISO 9001</span>
           <span className="text-lg font-bold">ALIBABA ASSURED</span>
           <span className="text-lg font-bold">TUV RHEINLAND</span>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} {t('footer.copyright')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
