import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import useCountUp from '../hooks/useCountUp';

const StatItem = ({ label, value }) => {
  const { ref, value: animated } = useCountUp(value, 2500);
  return (
    <div ref={ref} className="text-center group">
      <div className="text-3xl sm:text-4xl md:text-6xl font-black mb-1 sm:mb-2 text-white tracking-tight">{animated}</div>
      <div className="text-blue-200 font-semibold uppercase tracking-widest text-[10px] sm:text-xs">{label}</div>
    </div>
  );
};

const StatsCounter = () => {
  const { t } = useLanguage();
  const { config } = useSiteConfig();
  const statsData = config.homepage?.stats || {};

  const stats = [
    { label: t('stats.vehicles'), value: statsData.vehicles || '10,000+' },
    { label: t('stats.countries'), value: statsData.countries || '50+' },
    { label: t('stats.partners'), value: statsData.partners || '5,000+' },
    { label: t('stats.experience'), value: statsData.experience || '15+' },
  ];

  return (
    <section className="relative py-14 sm:py-20 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-primary to-[#0a1628]" />
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-secondary/15 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, idx) => (
            <StatItem key={idx} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
