import React, { useState, useEffect } from "react";
import logo from "../../public/logo-giang-noi-tiet-2.png";
import Image from "next/image";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ResponsiveNavbar from "./ResponsiveNavbar";
import ContactForm from "./ContactForm";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCrowdFundingOpen, setIsCrowdFundingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleCrowdFunding = () => setIsCrowdFundingOpen(!isCrowdFundingOpen);

  return (
    <nav
      className={`fixed w-full h-16 z-50 transition-all duration-500 ${
        isSticky ? "shadow-sm bg-white" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center h-full w-full px-4 md:px-16">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Eco Bắc Giang logo"
            width={150}
            height={45}
            className="cursor-pointer object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex">
          <ul className="hidden sm:flex space-x-6">
            <li>
              <Link
                href="/"
                className={`hover:text-[#00ca99] font-heading font-semibold text-black`}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href="/gioi-thieu"
                className={`hover:text-[#00ca99] font-heading font-semibold text-black`}
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                href="/bai-viet"
                className={`hover:text-[#00ca99] font-heading font-semibold text-black`}
              >
                Kiến thức
              </Link>
            </li>
    
            <li>
              <Link
                href="/lien-he"
                className={`hover:text-[#00ca99] font-heading font-semibold text-black`}
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleCrowdFunding}
            className={`py-3 font-heading px-4 rounded font-semibold bg-[#00ca99]  text-white hover:bg-[#00ca99]/80`}
            aria-label="Open Crowd Funding form"
          >
            Đăng ký tư vấn
          </button>

          <a href="tel:+113519842020" className="flex items-center space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#00ca99]"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span className="text-black uppercase font-bold">0948.907.686</span>
          </a>
        </div>

        {/* Hamburger Menu */}
        <div
          className="md:hidden cursor-pointer text-black"
          onClick={toggleMenu}
          role="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <ResponsiveNavbar isOpen={menuOpen} toggleMenu={toggleMenu} isSticky={isSticky} />

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-start justify-center"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-[800px] bg-white h-[50px] flex items-center px-4 mt-20 rounded-full shadow-lg animate-fall"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, danh mục, bài viết..."
              className="w-full border-none outline-none text-black"
            />
          </div>
        </div>
      )}

      {/* Crowd Funding Popup */}
      {isCrowdFundingOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setIsCrowdFundingOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Crowd Funding Form"
        >
          <div
            className="bg-white rounded-2xl shadow-lg max-w-5xl w-full mx-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end items-center border-b p-4">
              <AiOutlineClose
                className="cursor-pointer"
                size={25}
                onClick={() => setIsCrowdFundingOpen(false)}
                aria-label="Close Crowd Funding form"
              />
            </div>
            <ContactForm />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;