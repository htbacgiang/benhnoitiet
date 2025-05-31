"use client";

import React, { useState } from "react";
import { Stethoscope, Utensils, Dumbbell, Heart, Monitor, BookOpen, Thermometer, Baby } from "lucide-react";

const ServicesComponent = () => {
  const services = [
    {
      name: "Tư vấn cá nhân hóa về tiểu đường thai kỳ",
      icon: <Stethoscope className="mx-auto mb-4 h-12 w-12" />,
      description: "Cung cấp các buổi tư vấn trực tiếp hoặc trực tuyến với bác sĩ nội tiết hoặc chuyên gia dinh dưỡng để đánh giá tình trạng sức khỏe, giải thích kết quả xét nghiệm, và đưa ra kế hoạch quản lý tiểu đường thai kỳ.",
      image: "/images/1.jpg",
    },
    {
      name: "Lập kế hoạch dinh dưỡng cá nhân hóa",
      icon: <Utensils className="mx-auto mb-4 h-12 w-12" />,
      description: "Cung cấp thực đơn mẫu hoặc kế hoạch dinh dưỡng được thiết kế riêng bởi chuyên gia dinh dưỡng, tập trung vào kiểm soát đường huyết.",
      image: "/images/1.jpg",
    },
    {
      name: "Tư vấn tập luyện và vận động",
      icon: <Dumbbell className="mx-auto mb-4 h-12 w-12" />,
      description: "Hướng dẫn các bài tập an toàn như yoga bầu, đi bộ, hoặc bài tập tim mạch để kiểm soát đường huyết.",
      image: "/images/1.jpg",
    },
    {
      name: "Hỗ trợ quản lý stress và sức khỏe tinh thần",
      icon: <Heart className="mx-auto mb-4 h-12 w-12" />,
      description: "Cung cấp tư vấn tâm lý hoặc các buổi thiền, yoga tinh thần để giảm căng thẳng và lo âu.",
      image: "/images/1.jpg",
    },
    {
      name: "Theo dõi và quản lý đường huyết từ xa",
      icon: <Monitor className="mx-auto mb-4 h-12 w-12" />,
      description: "Hỗ trợ theo dõi chỉ số đường huyết qua ứng dụng hoặc website, kết hợp tư vấn định kỳ.",
      image: "/images/1.jpg",
    },
    {
      name: "Giáo dục và cung cấp thông tin chuyên sâu",
      icon: <BookOpen className="mx-auto mb-4 h-12 w-12" />,
      description: "Cung cấp khóa học ngắn hoặc nội dung giáo dục về tiểu đường thai kỳ và các bệnh nội tiết khác.",
      image: "/images/1.jpg",
    },
    {
      name: "Tư vấn về các bệnh nội tiết khác",
      icon: <Thermometer className="mx-auto mb-4 h-12 w-12" />,
      description: "Tư vấn về các vấn đề nội tiết như suy giáp, cường giáp, hoặc PCOS, không chỉ cho bà bầu mà còn phụ nữ nói chung.",
      image: "/images/1.jpg",
    },
    {
      name: "Tư vấn chăm sóc sau sinh",
      icon: <Baby className="mx-auto mb-4 h-12 w-12" />,
      description: "Hướng dẫn mẹ sau sinh kiểm soát đường huyết và giảm nguy cơ tiểu đường tuýp 2.",
      image: "/images/1.jpg",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-6xl p-6 text-center">
        <h1 className="text-4xl font-bold text-black mt-2">
          Dịch Vụ Hỗ Trợ Tiểu Đường Thai Kỳ
        </h1>
        <p className="mt-4 text-gray-600">
          Cung cấp các giải pháp toàn diện giúp bà bầu quản lý tiểu đường thai kỳ, đảm bảo sức khỏe cho mẹ và bé thông qua tư vấn chuyên sâu, dinh dưỡng, và chăm sóc tinh thần.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {services.map((service, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setHoveredIndex(hoveredIndex === index ? null : index);
                }
              }}
              className={`relative rounded-lg shadow-md p-6 text-center min-h-[300px] flex flex-col justify-between transition-all duration-300 ${
                hoveredIndex === index
                  ? "bg-black bg-opacity-60 text-white"
                  : "bg-white text-black"
              } bg-cover bg-center bg-blend-overlay`}
              style={{
                backgroundImage: hoveredIndex === index ? `url(${service.image})` : "none",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {React.cloneElement(service.icon, {
                className: `mx-auto mb-4 h-12 w-12 transition-colors duration-300 ${
                  hoveredIndex === index ? "text-white" : "text-[#00ca99]"
                }`,
              })}
              <h3 className="text-lg font-medium">{service.name}</h3>
              <p className="mt-2 text-sm flex-grow">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;