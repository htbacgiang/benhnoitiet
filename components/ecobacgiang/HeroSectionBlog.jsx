import React from 'react';

const HeroSectionBlog = ({ 
  label = 'Trang Blog Giang Nội Tiết', 
  heading = 'Tư Vấn Tiểu Đường Thai Kỳ – Đồng Hành Cùng Sức Khỏe Mẹ và Bé' 
}) => {
  return (
    <section
      className="py-6 flex flex-col items-center justify-center bg-gray-50"
      aria-labelledby="hero-heading"
    >
      {/* Label */}
      <div className="text-blue-600 uppercase text-xl md:text-2xl font-semibold tracking-wide mb-4">
        {label}
      </div>
      {/* Main Heading */}
      <h2
        id="hero-heading"
        className="text-2xl sm:text-3xl md:text-2xl font-bold text-center leading-tight max-w-4xl mx-auto text-gray-800"
      >
        {heading}
      </h2>
   
    
    </section>
  );
};

export default HeroSectionBlog;