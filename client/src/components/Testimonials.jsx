import React, { useState, useEffect, useCallback } from 'react';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi';

const testimonials = [
  {
    id: 1,
    quote: "AutoGlobal has been our primary supplier from China for 3 years. Their EV sourcing and RoRo shipping reliability are outstanding.",
    name: "Ahmed Al-Rashidi",
    company: "Desert Auto Trading",
    country: "UAE",
    rating: 5,
    initials: "AA"
  },
  {
    id: 2,
    quote: "We've imported over 200 Chinese NEVs and used cars through AutoGlobal. Competitive pricing and excellent SGS inspection support.",
    name: "Youssef Benali",
    company: "Maghreb Motors",
    country: "Morocco",
    rating: 5,
    initials: "YB"
  },
  {
    id: 3,
    quote: "The fastest and most transparent used car export platform we've ever worked with. Highly recommend for bulk orders.",
    name: "Ibrahim Osman",
    company: "Nile Auto Group",
    country: "Egypt",
    rating: 5,
    initials: "IO"
  },
  {
    id: 4,
    quote: "Professional team, competitive FOB pricing, and they handle all customs paperwork. Perfect partner for our dealership.",
    name: "Fatima Al-Sayed",
    company: "Gulf Star Motors",
    country: "Saudi Arabia",
    rating: 5,
    initials: "FS"
  }
];

const TestimonialCard = ({ data }) => (
  <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-l-amber-400 h-full flex flex-col justify-between transition-all hover:shadow-xl">
    <div>
      <div className="flex mb-4">
        {[...Array(data.rating)].map((_, i) => (
          <HiStar key={i} className="text-amber-400 text-xl" />
        ))}
      </div>
      <p className="italic text-gray-600 mb-8 line-clamp-4 leading-relaxed">
        "{data.quote}"
      </p>
    </div>
    
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold mr-4 flex-shrink-0">
        {data.initials}
      </div>
      <div>
        <p className="font-bold text-gray-900 leading-tight">{data.name}</p>
        <p className="text-sm text-gray-500">{data.company}, {data.country}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getVisibleTestimonials = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((currentIndex + i) % testimonials.length);
    }
    return indices;
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-amber-100 text-amber-700 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            Trusted by Dealers Worldwide
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop: 3 Cards */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {getVisibleTestimonials().map((idx) => (
              <TestimonialCard key={`${testimonials[idx].id}-${currentIndex}`} data={testimonials[idx]} />
            ))}
          </div>

          {/* Mobile: 1 Card */}
          <div className="md:hidden">
            <TestimonialCard data={testimonials[currentIndex]} />
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute top-1/2 -left-12 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg text-gray-600 hover:text-amber-500 transition-colors"
          >
            <HiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute top-1/2 -right-12 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg text-gray-600 hover:text-amber-500 transition-colors"
          >
            <HiChevronRight className="text-2xl" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-10 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-amber-400 w-7' : 'bg-gray-300 w-2.5'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
