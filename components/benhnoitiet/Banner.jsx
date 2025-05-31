import { useState, useRef } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, PlayCircle } from 'lucide-react';
import ContactForm from "../header/ContactForm";

const Banner = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // State mới cho ContactForm
  const videoRef = useRef(null);

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Tua lại về đầu
    }
    setIsVideoOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="relative bg-white text-gray-800 min-h-screen px-4 sm:px-6 md:px-12 py-4 md:py-8">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url(/images/banner-bg-1.png)" }}
      >
        <div className="absolute inset-0 bg-[#FFFFFF] bg-opacity-0"></div>
      </div>

      {/* Banner Content */}
      <div className="max-w-7xl mx-auto mt-20 md:mt-16 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Text Content */}
        <div className="text-center md:text-left mb-6 sm:mb-8 md:mb-0 w-full md:w-1/2">
          <p className="text-xl sm:text-2xl text-[#00ca99] font-semibold mb-2 sm:mb-3">Bắt Đầu Hành Trình</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            Tư Vấn Tiểu Đường Thai Kỳ
          </h2>
          <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
            Chúng tôi hỗ trợ chẩn đoán và quản lý tiểu đường thai kỳ một cách chuyên sâu.
            Hãy để chúng tôi đồng hành cùng bạn trong hành trình sức khỏe của mẹ và bé.
          </p>
          <div className="mt-4 sm:mt-6 flex sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-[#FFE8A3] text-[#333333] px-3 sm:px-4 py-3 sm:py-3 rounded-lg hover:bg-[#FFD1DC] transition duration-300 text-base sm:text-base"
              aria-label="Liên hệ tư vấn tiểu đường thai kỳ"
            >
              Liên hệ tư vấn
            </button>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-2 text-[#00ca99] hover:text-[#00ca99]/80 justify-center"
              aria-label="Xem video giới thiệu Giang Nội Tiết"
            >
              <span className="relative flex items-center justify-center">
                <PlayCircle className="w-6 sm:w-8 h-6 sm:h-8 animate-pulse-scale" aria-hidden="true" />
                <span className="absolute inset-0 rounded-full bg-teal-100 opacity-30 scale-90 animate-pulse-scale"></span>
              </span>
              Xem Video
            </button>
          </div>
          <p className="mt-4 sm:mt-6 text-base sm:text-base text-[#666666]">
            Có câu hỏi? Vui lòng liên hệ với chúng tôi
          </p>
          {/* Social Icons */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center md:justify-start">
            <p className="text-base sm:text-base text-gray-600 mr-3 sm:mr-4">Mạng Xã Hội</p>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-600 hover:text-gray-800">
                <Facebook className="w-5 sm:w-6 h-5 sm:h-6" aria-hidden="true" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-600 hover:text-gray-800">
                <Twitter className="w-5 sm:w-6 h-5 sm:h-6" aria-hidden="true" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-600 hover:text-gray-800">
                <Instagram className="w-5 sm:w-6 h-5 sm:h-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full md:w-1/2 mt-6 md:mt-12 flex justify-center">
          <div className="relative w-full max-w-[20rem] sm:max-w-[30rem] h-auto aspect-[4/5]">
            <img
              src="/images/banner-img-shape-1.png"
              alt="Background shape"
              className="absolute inset-0 rounded-2xl transform rotate-6 z-[-1]"
            />
            <img
              src="/images/banner-img-1.png"
              alt="Doctor consulting"
              className="relative w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute -top-2 sm:-top-5 -left-2 sm:-left-5 w-10 sm:w-20 h-10 sm:h-20 bg-teal-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-2 sm:-bottom-5 -right-2 sm:-right-5 w-12 sm:w-24 h-12 sm:h-24 bg-teal-200 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Video Popup */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseVideo}
        >
          <div
            className="relative bg-white p-2 sm:p-4 rounded-lg w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCloseVideo}
            >
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <video
              ref={videoRef}
              width="100%"
              height="auto"
              className="min-h-[200px] sm:min-h-[300px] md:min-h-[400px] w-full"
              controls
              autoPlay
            >
              <source src="/videos/sample.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Contact Form Popup */}
      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseForm}
        >
          <div
            className="relative bg-white p-4 sm:p-6 rounded-lg w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCloseForm}
            >
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;