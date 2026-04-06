import React from 'react';
import StatsCounter from '../components/StatsCounter';
import WhyChooseUs from '../components/WhyChooseUs';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About AutoGlobal</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            We are a leading B2B used car export platform, bridging the gap between quality vehicle markets and global dealerships through transparency and excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Office" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To provide dealerships worldwide with a reliable, efficient, and transparent platform to source high-quality pre-owned vehicles, backed by professional inspection and seamless logistics.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our History</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-primary font-bold flex items-center justify-center rounded-full border border-blue-100">2010</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Company Founded</h4>
                      <p className="text-gray-500">Started as a local vehicle inspection and sourcing service.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-primary font-bold flex items-center justify-center rounded-full border border-blue-100">2015</div>
                    <div>
                      <h4 className="font-bold text-gray-900">B2B Export Launch</h4>
                      <p className="text-gray-500">Expanded operations to serve international dealers in SE Asia and Africa.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-primary font-bold flex items-center justify-center rounded-full border border-blue-100">2023</div>
                    <div>
                      <h4 className="font-bold text-gray-900">Global Sourcing Network</h4>
                      <p className="text-gray-500">Established direct sourcing hubs in UAE, China, Germany, and Japan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />
      <WhyChooseUs />

      {/* Team Section Placeholder */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Experienced professionals dedicated to transforming the global used car trade.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'John Chen', role: 'CEO & Founder', image: 'https://i.pravatar.cc/300?u=1' },
              { name: 'Sarah Miller', role: 'Global Logistics Director', image: 'https://i.pravatar.cc/300?u=2' },
              { name: 'Ahmed Hassan', role: 'Head of MENA Region', image: 'https://i.pravatar.cc/300?u=3' },
              { name: 'Yuki Tanaka', role: 'Lead Vehicle Inspector', image: 'https://i.pravatar.cc/300?u=4' },
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-6 group-hover:rotate-0 transition-transform"></div>
                  <img src={member.image} alt={member.name} className="relative z-10 w-48 h-48 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all shadow-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
