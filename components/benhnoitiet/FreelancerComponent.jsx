import React, { useState } from 'react';
import ContactForm from '../header/ContactForm';

const FreelancerComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConsultationClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="flex container mt-10 justify-center items-center min-h-[400px] rounded-[20px] shadow-lg p-5 mx-auto bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/banner-noi-tiet.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30 rounded-[20px]"></div>
        <div className="flex flex-col justify-center items-center text-center text-white max-w-2xl rounded-lg relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 text-white">
            HỖ TRỢ TIỂU ĐƯỜNG THAI KỲ TẠI GIANG NỘI TIẾT
          </h2>
          <p className="text-base sm:text-lg mb-8 text-white">
            Bạn đang mang thai và lo lắng về tiểu đường thai kỳ? Đội ngũ chuyên gia của chúng tôi sẽ hỗ trợ bạn kiểm soát sức khỏe một cách an toàn và hiệu quả!
          </p>
          <button
            onClick={handleConsultationClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-base transition-colors duration-300"
            aria-label="Đăng ký tư vấn miễn phí về tiểu đường thai kỳ"
          >
            Đăng ký tư vấn miễn phí
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
              aria-label="Đóng biểu mẫu tư vấn"
            >
              ×
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
};

export default FreelancerComponent;