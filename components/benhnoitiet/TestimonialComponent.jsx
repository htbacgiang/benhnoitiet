"use client";

import React, { useState, useMemo, useEffect } from "react";

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
      image: "/images/chi-hoa.jpg",
    },
    {
      name: "Lê Hoàng Anh",
      role: "Bà bầu, 32 tuần",
      feedback:
        "Tư vấn của bác sĩ Giang Nội Tiết thực sự hữu ích! Tôi được hướng dẫn cách theo dõi đường huyết và nhận được nhiều lời khuyên thiết thực để giữ sức khỏe cho cả tôi và em bé.",
      image: "/images/chi-hoa.jpg",
    },
    {
      name: "Phạm Minh Thư",
      role: "Bà bầu, 26 tuần",
      feedback:
        "Chị Giang không chỉ giỏi chuyên môn mà còn rất gần gũi. Nhờ chị, tôi đã biết cách quản lý tiểu đường thai kỳ mà không lo lắng quá nhiều. Cảm ơn chị rất nhiều!",
      image: "/images/chi-hoa.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 < 0 ? Math.max(0, testimonials.length - 2) : prevIndex - 2
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2
      );
    }, 5000); // Chuyển slide mỗi 5 giây

    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const currentTestimonials = useMemo(() => {
    const first = testimonials[currentIndex] || null;
    const second = testimonials[currentIndex + 1] || null;
    return [first, second].filter(Boolean);
  }, [currentIndex, testimonials]);

  if (testimonials.length === 0) {
    return <div className="text-center text-gray-600">Không có đánh giá nào.</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 py-12 px-4">
      <div className="flex flex-row items-center justify-between w-full max-w-6xl mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-black uppercase tracking-wide">
          Khách Hàng Nói Gì Về Giang Nội Tiết
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={handlePrev}
            aria-label="Phản hồi trước"
            className="bg-white hover:bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 shadow-md"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            aria-label="Phản hồi tiếp theo"
            className="bg-white hover:bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 shadow-md"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row w-full max-w-6xl space-y-6 md:space-y-0 md:space-x-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {currentTestimonials.map((testimonial, index) => (
          <div
            key={`${currentIndex}-${index}`}
            className="bg-white rounded-lg p-6 shadow-md w-full md:w-1/2 transition-all duration-500 ease-in-out opacity-0 translate-x-4 animate-slideIn"
          >
          
            <i className="mt-4 text-base font-bold text-gray-600">
              &quot;{testimonial.feedback}&quot;
            </i>
            <div className="flex items-center mt-6">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img
                  src={testimonial.image}
                  alt={`Ảnh của ${testimonial.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />
              </div>
              <div>
                <p className="text-black font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(1rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TestimonialComponent;