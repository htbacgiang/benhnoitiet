import React from 'react';

const FreelancerComponent = () => {
  return (
    <div
      className="flex container mt-10 justify-center items-center min-h-[400px] rounded-[20px] shadow-lg p-5 mx-auto bg-cover bg-center"
      style={{ backgroundImage: "url('/images/eCommerce.avif')" }} // Thay bằng đường dẫn hình ảnh thực tế
    >
      <div className="flex flex-col justify-center items-center text-center text-white max-w-2xl rounded-lg">
        <h1 className="text-2xl font-bold mb-5 text-[#F5F5F5]">HỖ TRỢ TIỂU ĐƯỜNG THAI KỲ TẠI GIANG NỘI TIẾT</h1>
        <p className="text-lg mb-8 text-black">
          Bạn đang mang thai và lo lắng về tiểu đường thai kỳ? Đội ngũ chuyên gia của chúng tôi sẽ hỗ trợ bạn kiểm soát sức khỏe một cách an toàn và hiệu quả!
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-base transition-colors duration-300">
          Đăng ký tư vấn miễn phí
        </button>
      </div>
    </div>
  );
};

export default FreelancerComponent;