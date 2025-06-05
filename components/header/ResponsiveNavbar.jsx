import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaAngleDown, FaChevronUp } from "react-icons/fa";
import ContactForm from "./ContactForm";
import logo from "../../public/logo-giang-noi-tiet-2.png";

const ResponsiveMenu = ({ isOpen, toggleMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const menuItems = [
    { name: "Trang chủ", link: "/" },
    { name: "Giới thiệu", link: "/gioi-thieu" },
    { name: "Kiến thức", link: "/bai-viet" },
    { name: "Liên hệ", link: "/lien-he" },
  ];

  return (
    <>
      {/* Overlay for Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleMenu}
        aria-hidden="true"
      ></div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-[70%] h-full max-h-full overflow-y-auto bg-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <Image
            src={logo}
            alt="Logo Eco Bắc Giang"
            width={150}
            height={70}
            className="w-auto h-12 object-contain"
            priority
          />
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <AiOutlineClose size={25} />
          </button>
        </div>


        {/* Menu Items */}
        <ul className="space-y-4 px-4 border-b border-gray-300 pb-4 uppercase">
          {menuItems.map((item, index) => (
            <li key={index}>
              {!item.dropdown ? (
                <Link
                  href={item.link}
                  className="text-lg font-medium hover:text-green-600"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <button
                    className="flex items-center justify-between w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600"
                    onClick={() => toggleDropdown(index)}
                    aria-expanded={activeDropdown === index}
                    aria-controls={`dropdown-${index}`}
                  >
                    <span className="text-lg font-medium hover:text-green-600">
                      {item.name}
                    </span>
                    <span className="text-lg">
                      {activeDropdown === index ? <FaChevronUp size={20} /> : <FaAngleDown size={20} />}
                    </span>
                  </button>
                  <ul
                    id={`dropdown-${index}`}
                    className={`pl-4 mt-2 ${activeDropdown === index ? "max-h-96" : "max-h-0"
                      } overflow-hidden transition-all duration-300`}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.link}
                          className="block py-1 text-gray-700 hover:text-green-600"
                          onClick={toggleMenu}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Social Media Links */}
        <div className="flex space-x-4 justify-center mt-6">
          <a
            href="https://facebook.com/giangnoitiet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-[#1877F2]" // Màu xanh của Facebook
            aria-label="Follow us on Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.youtube.com/@giangnoitiet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-[#FF0000]" // Màu đỏ của YouTube
            aria-label="Follow us on YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.tiktok.com/@giangnoitiettw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-[#000000]" // Màu đen của TikTok
            aria-label="Follow us on TikTok"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.instagram.com/giangnoitiet/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-[#E1306C]" // Màu hồng của Instagram
            aria-label="Follow us on Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Register Consultation Button */}
        <div className="mt-4 px-4">
          <button
            onClick={toggleModal}
            className="w-full px-3 py-2  rounded bg-[#00ca99]  text-white hover:bg-[#00ca99]/80 focus:outline-none focus:ring-2 focus:ring-green-600"
            aria-label="Đăng ký tư vấn"
          >
            Đăng ký tư vấn
          </button>
        </div>
      </div>

      {/* Modal for Contact Form */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleModal}
        aria-hidden="true"
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg z-60 transition-transform duration-300 ${isModalOpen ? "scale-100" : "scale-0"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b ">
          <h2 className="text-lg font-semibold ">Đăng ký tư vấn</h2>
          <button
            onClick={toggleModal}
            aria-label="Close consultation form"
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="p-4">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;