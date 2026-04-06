import React from 'react';
import { HiOutlineShieldCheck, HiOutlineTruck, HiOutlineBadgeCheck, HiOutlineSupport } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';
import useScrollReveal from '../hooks/useScrollReveal';

const WhyChooseUs = () => {
  const { t } = useLanguage();
  const sectionRef = useScrollReveal({ staggerChildren: true });

  const features = [
    { icon: <HiOutlineShieldCheck className="w-8 h-8" />, title: t('whyUs.quality'), description: t('whyUs.qualityDesc'), gradient: 'from-blue-500 to-cyan-400', bgLight: 'bg-blue-50' },
    { icon: <HiOutlineTruck className="w-8 h-8" />, title: t('whyUs.shipping'), description: t('whyUs.shippingDesc'), gradient: 'from-emerald-500 to-teal-400', bgLight: 'bg-emerald-50' },
    { icon: <HiOutlineBadgeCheck className="w-8 h-8" />, title: t('whyUs.pricing'), description: t('whyUs.pricingDesc'), gradient: 'from-amber-500 to-yellow-400', bgLight: 'bg-amber-50' },
    { icon: <HiOutlineSupport className="w-8 h-8" />, title: t('whyUs.support'), description: t('whyUs.supportDesc'), gradient: 'from-purple-500 to-pink-400', bgLight: 'bg-purple-50' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container-custom relative">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Why Choose Us</div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-4">{t('whyUs.title')}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">{t('whyUs.subtitle')}</p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`relative w-14 h-14 sm:w-16 sm:h-16 ${feature.bgLight} rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="relative text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
              <p className="relative text-gray-500 leading-relaxed text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
