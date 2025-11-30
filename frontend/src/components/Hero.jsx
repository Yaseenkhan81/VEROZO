import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="text-[#414141] px-6 sm:px-10 fade-in">
          {/* Top Label */}
          <div className="flex items-center gap-2 mb-4">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141] animate-pulse"></p>
            <p className="font-medium text-sm md:text-base tracking-wider">OUR BESTSELLERS</p>
          </div>

          {/* Main Heading */}
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed mb-4">
            Latest Arrivals
          </h1>

          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Discover our newest collection of premium fashion items
          </p>

          {/* Bottom CTA */}
          <Link 
            to="/collection"
            className="inline-flex items-center gap-2 mt-3 bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-all duration-300 group"
          >
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-white group-hover:w-14 transition-all"></p>
          </Link>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 overflow-hidden">
        <img 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
          src={assets.hero_img} 
          alt="Latest fashion arrivals" 
        />
      </div>
    </div>
  );
};

export default Hero;


