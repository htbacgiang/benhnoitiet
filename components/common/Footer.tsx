import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBoxOpen, FaHandHoldingHeart, FaLeaf, FaTruck, FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const [location, setLocation] = useState({ ip: "", city: "", country: "" });

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => setLocation(data))
      .catch(() => setLocation({ ip: "Không xác định", city: "N/A", country: "N/A" }));
  }, []);

  return (
    <div>
      {/* Footer */}
      <footer className="bg-[#f9f9f9] pt-10 pb-20 md:pb-10">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
          {/* Logo and Address */}
          <div className="flex flex-col items-start">
            <Link href="/" aria-label="Giang Nội Tiết Home">
              <Image
                src="/logo-giang-noi-tiet-2.png" // Thay bằng đường dẫn logo thực tế
                alt="Giang Nội Tiết Logo"
                width={120}
                height={40}
                className="mb-4"
              />
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Giang Nội Tiết là đơn vị tiên phong trong lĩnh vực chăm sóc sức khỏe nội tiết, mang đến giải pháp toàn diện cho sức khỏe của bạn.
            </p>
            <p className="text-sm text-gray-600 mb-2 font-semibold">
              📍 Đồng Tân, Ứng Hòa, Hà Nội
            </p>
            <p className="text-sm text-gray-600 mb-2 font-semibold">
              📞 0948.907.686
            </p>
            <p className="text-sm text-gray-600 font-semibold">
              📧 lienhe@giangnoitiet.vn
            </p>

          </div>

          {/* Company */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold mb-4">Về chúng tôi</h4>
            <ul className="text-sm text-gray-600 space-y-2 font-semibold">
              <li className="hover:text-[#00ca99] hover:translate-x-2 transition-all duration-300">
                <Link href="/gioi-thieu">Về Giang Nội Tiết</Link>
              </li>
              <li className="hover:text-[#00ca99] hover:translate-x-2 transition-all duration-300">
                <Link href="/bai-viet">Blog sức khỏe</Link>
              </li>
              <li className="hover:text-[#00ca99] hover:translate-x-2 transition-all duration-300">
                <Link href="/lien-he">Địa chỉ Maps</Link>
              </li>

              <li className="hover:text-[#00ca99] hover:translate-x-2 transition-all duration-300">
                <Link href="/">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-semibold mb-4">Kết nối với chúng tôi</h4>
            <p className="text-sm text-gray-600 mb-4">
              Theo dõi chúng tôi để cập nhật thông tin sức khỏe và các chương trình mới nhất.
            </p>
            <div className="mb-4 w-full">
              <div
                className="fb-page"
                data-href="https://www.facebook.com/giangnoitiet"
                data-tabs=""
                data-width=""
                data-height=""
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://www.facebook.com/giangnoitiet"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/giangnoitiet">Giang Nội Tiết</a>
                </blockquote>
              </div>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/giangnoitiet"  
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Theo dõi Giang Nội Tiết trên Facebook"
              >
                <FaFacebook className="text-gray-600 hover:text-[#00ca99] text-xl transition-colors duration-200" />
              </a>
              <a
                href="https://www.instagram.com/giangnoitiet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Theo dõi Giang Nội Tiết trên Instagram"
              >
                <FaInstagram className="text-gray-600 hover:text-[#00ca99] text-xl transition-colors duration-200" />
              </a>
              <a
                href="https://www.youtube.com/@giangnoitiet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Theo dõi Giang Nội Tiết trên YouTube"
              >
                <FaYoutube className="text-gray-600 hover:text-[#00ca99] text-xl transition-colors duration-200" />
              </a>
              <a
                href="https://www.tiktok.com/@giangnoitiettw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Theo dõi Giang Nội Tiết trên TikTok"
              >
                <FaTiktok className="text-gray-600 hover:text-[#00ca99] text-xl transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-center items-center text-gray-600 text-sm gap-3 p-2 mt-6">
          <p>© 2025 giangnoitiet.vn. All rights reserved.</p>
          {location.city !== "N/A" && (
            <p>
              Vị trí của bạn: {location.city}, {location.country}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Footer;