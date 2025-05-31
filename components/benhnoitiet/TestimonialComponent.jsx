"use client";

import React, { useState, useMemo } from "react";

const TestimonialComponent = () => {
  const testimonials = [
    {
      name: "Phạm Hoa",
      role: "Bà bầu, 30 tuần",
      feedback:
        "Chị Giang đã giúp tôi hiểu rõ về tiểu đường thai kỳ và cách kiểm soát đường huyết an toàn cho cả mẹ và bé. Tư vấn rất tận tình, dễ hiểu, tôi cảm thấy yên tâm hơn nhiều trong thai kỳ!",
      image: "/images/chi-hoa.jpg",
    },
    {
      name: "Trần Ngọc Linh",
      role: "Bà bầu, 28 tuần",
      feedback:
        "Nhờ sự hướng dẫn chi tiết của bác sĩ Giang, tôi đã điều chỉnh chế độ ăn uống và tập luyện phù hợp để kiểm soát tiểu đường thai kỳ. Chị ấy rất chu đáo và luôn sẵn sàng giải đáp thắc mắc!",
      image: "https://via.placeholder.com/150?text=Linh",
    },
    {
      name: "Lê Hoàng Anh",
      role: "Bà bầu, 32 tuần",
      feedback:
        "Tư vấn của bác sĩ Giang Nội Tiết thực sự hữu ích! Tôi được hướng dẫn cách theo dõi đường huyết và nhận được nhiều lời khuyên thiết thực để giữ sức khỏe cho cả tôi và em bé.",
      image: "https://via.placeholder.com/150?text=Anh",
    },
    {
      name: "Phạm Minh Thư",
      role: "Bà bầu, 26 tuần",
      feedback:
        "Chị Giang không chỉ giỏi chuyên môn mà còn rất gần gũi. Nhờ chị, tôi đã biết cách quản lý tiểu đường thai kỳ mà không lo lắng quá nhiều. Cảm ơn chị rất nhiều!",
      image: "https://via.placeholder.com/150?text=Thu",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = useMemo(
    () => testimonials[currentIndex],
    [currentIndex, testimonials]
  );

  if (testimonials.length === 0) {
    return <div className="text-center text-gray-600">Không có đánh giá nào.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-5xl p-4 sm:p-6 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-black mt-2">
          Khách Hàng Nói Gì Về Giang Nội Tiết
        </h2>

        <div
          key={currentIndex}
          className="mt-8 bg-white shadow-lg rounded-lg p-4 sm:p-6 relative animate-fadeIn"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500">
              <img
                src={currentTestimonial.image}
                alt={`Ảnh của ${currentTestimonial.name}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => (e.target.src = "/fallback-image.jpg")}
              />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-black">
            {currentTestimonial.name}
          </h3>
          <p className="text-sm text-gray-500">{currentTestimonial.role}</p>
          <p className="mt-4 text-gray-600">{currentTestimonial.feedback}</p>

          <button
            onClick={handlePrev}
            aria-label="Phản hồi trước"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-blue-400 text-gray-600 hover:text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            aria-label="Phản hồi tiếp theo"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-blue-400 text-gray-600 hover:text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
          >
            →
          </button>

          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-green-500" : "bg-gray-300"
                  }`}
                aria-label={`Xem phản hồi ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialComponent;