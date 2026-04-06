import React, { useState } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiChatAlt } from 'react-icons/hi';
import { FaWhatsapp, FaWeixin, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for contacting us. We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-primary text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">Have questions about our inventory or export process? Our team is here to help you.</p>
        </div>
      </div>

      <div className="container-custom -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <HiOutlinePhone size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4 text-sm">Call us directly for urgent inquiries.</p>
              <p className="text-primary font-bold text-xl">+86 123 4567 8900</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <FaWhatsapp size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp / WeChat</h3>
              <p className="text-gray-600 mb-4 text-sm">Quick chat with our sales agents.</p>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-gray-900 font-bold">
                  <FaWhatsapp className="text-green-500" /> +86 123 4567 8900
                </p>
                <p className="flex items-center gap-2 text-gray-900 font-bold">
                  <FaWeixin className="text-green-600" /> AutoGlobal_Export
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <HiOutlineMail size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Address</h3>
              <p className="text-gray-600 mb-4 text-sm">Send us your detailed requirements.</p>
              <p className="text-primary font-bold">sales@autoglobal.com</p>
              <p className="text-primary font-bold">info@autoglobal.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full border-gray-200 rounded-lg p-3 focus:ring-primary focus:border-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full border-gray-200 rounded-lg p-3 focus:ring-primary focus:border-primary"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="w-full border-gray-200 rounded-lg p-3 focus:ring-primary focus:border-primary"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="e.g. Bulk SUV inquiry for Nigerian market"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows="6" 
                    required
                    className="w-full border-gray-200 rounded-lg p-3 focus:ring-primary focus:border-primary"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your requirements, destination port, and expected quantities..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full md:w-auto px-12 py-4 text-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Our Global Presence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="font-bold text-gray-900">Headquarters (China)</p>
              <p className="text-gray-500 text-sm">Room 1205, Finance Plaza, Shenzhen, Guangdong</p>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-gray-900">MENA Hub (Dubai)</p>
              <p className="text-gray-500 text-sm">Business Bay, P.O. Box 45001, Dubai, UAE</p>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-gray-900">European Hub (Germany)</p>
              <p className="text-gray-500 text-sm">Hafenstraße 44, 20457 Hamburg, Germany</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
