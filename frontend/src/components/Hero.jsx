import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <div className="bg-indigo-800">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-200">
            {subtitle}
          </p>
          <div className="mt-10">
            <Link
              to={ctaLink}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;