import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Images (Giữ nguyên) */}
          <div className="relative grid grid-cols-2 grid-rows-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 h-64">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(/images/giang-noi-tiet-1.webp)` }}
              />
              <div className="absolute -top-6 -left-6 w-16 h-16 border-2 border-blue-200 rotate-45 bg-white"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 h-64">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(/images/giang-noi-tiet-4.webp)` }}
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 h-64">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(/images/giang-noi-tiet-3.webp)` }}
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 h-64">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(/images/giang-noi-tiet-2.webp)` }}
              />
              <div className="absolute bottom-0 left-0 w-full h-8 bg-orange-500 opacity-50">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,0 L100,0 L100,50 L75,100 L50,50 L25,100 L0,50 Z" fill="white" />
                </svg>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-75 bg-blue-100 text-blue-600 rounded-full w-48 h-48 flex flex-col items-center justify-center p-4">
              <span className="text-5xl font-extrabold">12</span>
              <span className="text-lg font-bold">Năm Kinh Nghiệm</span>
            </div>
         
          </div>

          {/* Right Side - Text and Buttons */}
          <div className="space-y-3 relative">
            <div className="flex justify-center lg:justify-start">
              <h2 className="text-[#A8E4A0] text-xl font-semibold relative inline-flex items-center md:ml-6">
                <span className="relative z-10">Về Giang Nội Tiết</span>
                <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-[#A8E4A0]"></span>
                <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-[#A8E4A0]"></span>
              </h2>
            </div>
            <h2 className="md:text-xl text-sm uppercase font-bold text-[#A2CFFE] leading-tight text-center lg:text-left">
              Nguyễn Thị Hương Giang – Chuyên gia Nội Tiết
            </h2>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              Với hơn 12 năm kinh nghiệm tại Bệnh viện Nội Tiết Trung Ương, tôi chuyên tư vấn và điều trị các rối loạn nội tiết ở phụ nữ, đặc biệt là tiểu đường thai kỳ, giúp phụ nữ Việt Nam sống khỏe mạnh và tự tin qua mọi giai đoạn cuộc đời.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-teal-100 text-teal-700 px-4 py-3 rounded-full flex items-center space-x-3 hover:bg-teal-200 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Tư vấn Tiểu Đường Thai Kỳ</span>
              </button>
              <button className="bg-purple-100 text-purple-700 px-4 py-3 rounded-full flex items-center space-x-3 hover:bg-purple-200 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm">Chuyên gia Nội Tiết</span>
              </button>
              <button className="bg-pink-100 text-pink-700 px-4 py-3 rounded-full flex items-center space-x-3 hover:bg-pink-200 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Chăm sóc Phụ nữ</span>
              </button>
              <button className="bg-[#A2CFFE] text-blue-500 px-4 py-3 rounded-full flex items-center space-x-3 hover:bg-[#A2CFFE]/80 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a3.5 3.5 0 113.5-3.5c1.589 0 3.094.783 4 2.072M7 14l5.182 5.182a2.25 2.25 0 003.182 0L23 14M7 14l9.06-9.06a2.25 2.25 0 00-3.182 0z" />
                </svg>
                <span className="text-sm">Cân bằng Nội Tiết</span>
              </button>
            </div>
            <Link href="/gioi-thieu">
              <button className="bg-blue-900 mt-4 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-all">
                Tìm Hiểu Thêm
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}