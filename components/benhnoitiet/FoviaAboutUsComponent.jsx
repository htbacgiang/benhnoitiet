"use client";

import React from "react";

const FoviaAboutUsComponent = () => {
  return (
    <div className="flex items-center justify-center "> {/* Thay bg-white thành xám nhạt */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full container p-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="/images/giang-noi-tiet.jpg"
            alt="Điều dưỡng Nguyễn Thị Hương Giang"
            className="w-full h-auto object-cover rounded-lg shadow-md" 
          />
        </div>

        {/* Text and Button Section */}
        <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#A2CFFE] mt-2">
            Giang Nội Tiết Là Ai?
          </h1>
          <h2 className="text-2xl font-semibold text-[#333333] mt-2"> {/* Thay text-black thành màu xám đậm để nhẹ nhàng hơn */}
            Tôi Là Nguyễn Thị Hương Giang
          </h2>
          <p className="mt-4 text-[#666666]"> {/* Thay text-gray-600 thành màu xám nhẹ hơn */}
            Điều dưỡng chuyên khoa Nội tiết sinh sản, hiện đang công tác tại Bệnh viện Nội Tiết Trung Ương với hơn 12 năm kinh nghiệm. Tôi chuyên sâu về các vấn đề rối loạn nội tiết ảnh hưởng đến sức khỏe sinh sản và chuyển hóa ở phụ nữ, đặc biệt là các bệnh lý như:
          </p>
          <ul className="mt-6 space-y-2 text-[#666666]">
            <li className="flex items-center">
              <span className="text-[#A8E4A0] mr-2">✔</span> Rối loạn kinh nguyệt quanh mãn kinh
            </li>
            <li className="flex items-center">
              <span className="text-[#A8E4A0] mr-2">✔</span> Tiểu đường thai kỳ
            </li>
            <li className="flex items-center">
              <span className="text-[#A8E4A0] mr-2">✔</span> Suy giảm nội tiết tố nữ (estrogen, progesterone)
            </li>
            <li className="flex items-center">
              <span className="text-[#A8E4A0] mr-2">✔</span> Bệnh lý tuyến giáp (Basedow, suy giáp, viêm tuyến giáp)
            </li>
            <li className="flex items-center">
              <span className="text-[#A8E4A0] mr-2">✔</span> Mỡ máu cao, hội chứng chuyển hóa
            </li>
            <li className="flex items-center">
              <span className="text-[#A8E4A0] mr-2">✔</span> Khô hạn, suy giảm ham muốn, mất ngủ do rối loạn nội tiết
            </li>
          </ul>
       
        </div>
      </div>
    </div>
  );
};

export default FoviaAboutUsComponent;