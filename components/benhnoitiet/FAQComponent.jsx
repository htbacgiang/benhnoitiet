"use client";

import React, { useState, useMemo } from "react";

const FAQComponent = () => {
  const [expanded, setExpanded] = useState(null);

  const faqs = useMemo(
    () => [
      {
        question: "Đường huyết bình thường ở phụ nữ mang thai bị TĐTK là bao nhiêu?",
        answer:
          "Mục tiêu: Lúc đói <95 mg/dL (5.3 mmol/L), sau ăn 1h <140 mg/dL (7.8 mmol/L), sau ăn 2h <120 mg/dL (6.7 mmol/L). Tuân theo chỉ định bác sĩ.",
      },
      {
        question: "Bị TĐTK nên ăn gì, kiêng gì?",
        answer:
          "Nên ăn: Gạo lứt, yến mạch, khoai lang, đậu, trái cây GI thấp (ổi, bưởi, táo). Kiêng: Gạo trắng, bánh ngọt, trái cây ngọt (xoài, sầu riêng). Sữa chua không đường, bơ, trứng vịt lộn (1-2 quả/tuần) đều tốt nếu ăn điều độ.",
      },

      {
        question: "TĐTK có ảnh hưởng đến em bé không?",
        answer:
          "Nếu không kiểm soát tốt, bé có nguy cơ to (macrosomia), hạ đường huyết sơ sinh, vàng da, hoặc vấn đề hô hấp. Kiểm soát đường huyết tốt giảm nguy cơ đáng kể.",
      },

      {
        question: "Mẹ bị TĐTK cho con bú có sao không?",
        answer:
          "An toàn và rất tốt. Sữa mẹ không làm tăng đường huyết bé, giúp mẹ giảm nguy cơ tiểu đường type 2 và bé giảm nguy cơ béo phì sau này.",
      },
      {
        question: "Tại sao đường huyết đói buổi sáng cao dù ăn kiêng kỹ?",
        answer:
          "Có thể do hiện tượng bình minh, ăn tối quá ít/muộn, hoặc stress. Thử bữa phụ tối giàu protein (hạt, sữa không đường). Nếu không cải thiện, hỏi bác sĩ.",
      },
      {
        question: "TĐTK có hết sau sinh không? Cần xét nghiệm gì?",
        answer:
          "Khoảng 90% hết sau sinh. Làm OGTT (75g glucose) sau 4-12 tuần. Bình thường: Đói <100 mg/dL, sau 2h <140 mg/dL. Test lại mỗi 1-3 năm vì nguy cơ tiểu đường type 2 cao.",
      },

    ],
    []
  );

  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-white">
      <div className="w-full max-w-7xl p-6 flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center items-center relative">
          <div className="relative flex flex-col items-center">
            <img
              src="/images/banner-img-1.png"
              alt="Bác sĩ tư vấn tiểu đường thai kỳ"
              className="w-3/4 h-auto object-cover rounded-full"
              loading="lazy"
            />
            <div className="absolute bottom-0 bg-purple-500 text-white rounded-lg p-4 shadow-lg z-40 w-[80%] max-w-xl flex justify-center items-center">
              <p className="text-sm sm:text-base font-semibold text-center">
                Hỗ Trợ Giải Đáp Về Tiểu Đường Thai Kỳ!
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
          <h2 className="text-2xl font-bold text-black md:block hidden">
            Giải Đáp Thắc Mắc Về Tiểu Đường Thai Kỳ
          </h2>
          <p className="mt-4 text-gray-600">
            Tìm hiểu các thông tin cần thiết để kiểm soát tiểu đường thai kỳ, đảm bảo sức khỏe cho mẹ và bé.
          </p>
          <div className="mt-6 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <button
                  className="flex justify-between items-center w-full text-left cursor-pointer focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={expanded === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <p className="text-lg font-medium text-gray-800">{faq.question}</p>
                  <span className="text-2xl">{expanded === index ? "−" : "+"}</span>
                </button>
                {expanded === index && (
                  <p id={`faq-answer-${index}`} className="mt-2 text-gray-600">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;