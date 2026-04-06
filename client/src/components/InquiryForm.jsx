import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiX, HiPaperAirplane } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const InquiryForm = ({ vehicle, isOpen, onClose }) => {
  const { t } = useLanguage();
  const { getWhatsAppUrl } = useSiteConfig();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    port: '',
    quantity: '1',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const countries = [
    'United Arab Emirates', 'Saudi Arabia', 'Russia', 'Kazakhstan', 'Nigeria', 
    'Egypt', 'Jordan', 'Vietnam', 'Philippines', 'Mexico', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Inquiry submitted:', { ...formData, vehicleId: vehicle?.id });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: '', email: '', phone: '', company: '', country: '', port: '', quantity: '1', message: '',
        });
      }, 3000);
    }, 1500);
  };

  const whatsappMsg = vehicle 
    ? `Hi, I'm interested in ${vehicle.title}, priced at $${vehicle.price?.toLocaleString()}. My details: Company: ${formData.company || 'N/A'}, Country: ${formData.country || 'N/A'}`
    : "Hi, I'm interested in your used car inventory.";

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-[60] overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-2xl p-4 sm:p-6 my-4 sm:my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <Dialog.Title as="h3" className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t('inquiry.title')}
                </Dialog.Title>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              {isSuccess ? (
                <div className="py-8 sm:py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">&#10003;</div>
                  <h4 className="text-xl font-bold mb-2">{t('inquiry.success')}</h4>
                  <p className="text-gray-500">{t('inquiry.successMsg')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {vehicle && (
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <img src={vehicle.image || vehicle.images?.[0]} alt="" className="w-14 sm:w-16 h-12 sm:h-16 object-cover rounded" />
                      <div className="min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">{vehicle.title}</p>
                        <p className="text-primary font-bold text-sm">${vehicle.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('inquiry.yourName')} *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('inquiry.email')} *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('inquiry.phone')} *</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('inquiry.company')}</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('inquiry.country')} *</label>
                      <select name="country" required value={formData.country} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm">
                        <option value="">{t('inquiry.selectCountry')}</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('inquiry.port')}</label>
                      <input type="text" name="port" value={formData.port} onChange={handleChange} placeholder={t('inquiry.portPlaceholder')} className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('inquiry.quantity')}</label>
                      <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('inquiry.message')}</label>
                    <textarea name="message" rows="3" value={formData.message} onChange={handleChange} placeholder={t('inquiry.messagePlaceholder')} className="w-full border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 btn-primary flex items-center justify-center py-3"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> {t('inquiry.sending')}</span>
                      ) : (
                        <>
                          <HiPaperAirplane className="mr-2 rotate-90" />
                          {t('inquiry.send')}
                        </>
                      )}
                    </button>
                    <a
                      href={getWhatsAppUrl(whatsappMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-semibold py-3 px-6 rounded-md transition-colors"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InquiryForm;
