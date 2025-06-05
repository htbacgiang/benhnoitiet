"use client";

import React from "react";

const MissionComponent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-10 py-12">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center px-4">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="/benhnoitiet/1.jpg"
            alt="Điều dưỡng hỗ trợ sức khỏe mẹ bầu"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 md:pl-8 text-left">
          <h2 className="text-3xl font-bold text-[#A2CFFE]">
            Sứ Mệnh Của Giang Nội Tiết
          </h2>
          <p className="mt-4 text-[#666666]">
            Sứ mệnh của tôi là giúp hàng triệu phụ nữ Việt Nam, đặc biệt là mẹ bầu, hiểu rõ cơ thể mình, chủ động kiểm soát sức khỏe nội tiết và quản lý tiểu đường thai kỳ, để đảm bảo sức khỏe cho cả mẹ và bé trong các giai đoạn quan trọng như:
          </p>
          <ul className="mt-6 space-y-2 text-[#666666]">
            <li className="flex items-start">
              <span className="text-[#A8E4A0] mr-2">✔</span> Thai kỳ: Hỗ trợ quản lý tiểu đường thai kỳ, đảm bảo sức khỏe mẹ và bé.
            </li>
            <li className="flex items-start">
              <span className="text-[#A8E4A0] mr-2">✔</span> Sau sinh (28 - 35 tuổi): Cân bằng nội tiết, tránh suy giảm sớm.
            </li>
            <li className="flex items-start">
              <span className="text-[#A8E4A0] mr-2">✔</span> Tiền mãn kinh (35 - 45 tuổi): Hạn chế khô hạn, mất ngủ, rối loạn kinh nguyệt.
            </li>
          </ul>
       
        </div>
      </div>
    </div>
  );
};

export default MissionComponent;