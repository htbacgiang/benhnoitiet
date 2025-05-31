import React from 'react';

const FeaturedProductsHealth = () => {
  const products = [
    { name: 'Antiseptic Spray', price: 32.00, originalPrice: 46.00, isNew: true, image: '/product/1.png' },
    { name: 'Digital Stethoscope', price: 25.00, originalPrice: 36.00, isNew: true, image: '/product/2.png' },
    { name: 'Cosmetic Containers', price: 75.00, originalPrice: 92.00, isNew: true, image: '/product/3.png' },
    { name: 'Cosmetic Containers', price: 78.00, originalPrice: 86.00, isNew: true, image: '/product/4.png' },
    { name: 'Blue Hand Gloves', price: 150.00, originalPrice: 180.00, isNew: true, image: '/product/5.png' },
    { name: 'Thermometer Gun', price: 150.00, originalPrice: 180.00, isNew: true, image: '/product/6.png' },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl font-bold text-center mb-8">Sản phẩm hỗ trợ</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Left Banner Section */}
        <div className="md:col-span-1 space-y-6">
          {/* First Banner */}
          <div className="">
            <img src="/product/11.jpg" alt="Mask" className="mt-4 mx-auto" />
          </div>
          {/* Second Banner */}
          <div className="">
            <img src="/product/12.jpg" alt="Mask" className="mt-4 mx-auto" />
          </div>
        </div>


        {/* Product Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="relative bg-white p-4 rounded-lg shadow-md text-center">
              {product.isNew && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  Mới
                </span>
              )}
              <img src={product.image} alt={product.name} className="mx-auto mb-4 object-contain" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex justify-center space-x-2 mt-2">
                <span className="text-red-500 font-bold">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsHealth;