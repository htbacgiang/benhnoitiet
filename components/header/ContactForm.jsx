"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^\d{10,11}$/.test(formData.phone))
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email không hợp lệ";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập yêu cầu tư vấn";
    else if (formData.message.length > 500)
      newErrors.message = "Tin nhắn không được vượt quá 500 ký tự";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const leftSection = leftSectionRef.current;
    const rightSection = rightSectionRef.current;

    if (rightSection) observer.observe(rightSection);
    if (leftSection && window.innerWidth >= 768) observer.observe(leftSection);

    return () => {
      if (rightSection) observer.unobserve(rightSection);
      if (leftSection) observer.unobserve(leftSection);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("Đang gửi...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Đăng ký tư vấn thành công!");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 3000);
      } else {
        throw new Error(result.message || "Không thể gửi yêu cầu");
      }
    } catch (error) {
      setStatus("Lỗi: Vui lòng thử lại hoặc liên hệ qua hotline.");
    }
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className="border rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ju">
            <div ref={leftSectionRef} className="opacity-0 md:block hidden justify-center">

              <div className="relative z-10">
                <img
                  src="/images/tu-van.webp"
                  alt="Bác sĩ tư vấn tiểu đường thai kỳ"
                  onError={(e) => (e.target.src = "/images/fallback.webp")}
                  className="w-3/4 h-auto object-cover rounded-full mx-auto"
                />
              </div>
              <h4 className="text-xl mt-6 font-semibold text-[#00ca99] uppercase tracking-wide mb-2 text-center">
                Đăng ký tư vấn miễn phí
              </h4>
            </div>
            <div ref={rightSectionRef} className="opacity-0">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                role="form"
                aria-label="Form đăng ký tư vấn tiểu đường thai kỳ Giang Nội Tiết"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Họ và tên"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email của bạn (tùy chọn)"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Yêu cầu tư vấn của bạn (ví dụ: tình trạng tiểu đường thai kỳ, chế độ ăn uống, thời gian tư vấn...)"
                    aria-describedby={errors.message ? "message-error" : "message-count"}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none ${errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  <p id="message-count" className="text-sm text-gray-500 text-right">
                    {formData.message.length}/500
                  </p>
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "Đang gửi..."}
                  className="w-full bg-green-500 text-white font-semibold py-3 rounded-full hover:bg-blue-500 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
                  aria-disabled={status === "Đang gửi..."}
                >
                  Đăng ký tư vấn <span>→</span>
                </button>
              </form>
              {status && (
                <p
                  className={`mt-2 text-center ${status.includes("thành công") ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .opacity-0 {
          opacity: 0;
        }
        .slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}