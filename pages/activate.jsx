// pages/activate.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export default function ActivateAccount() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [isSuccess, setIsSuccess] = useState(false); // Thêm trạng thái thành công

  useEffect(() => {
    if (!token) {
      // Nếu không có token, hiển thị lỗi và dừng tải
      setMessage('Không tìm thấy mã kích hoạt. Vui lòng kiểm tra lại đường dẫn.');
      setLoading(false);
      return;
    }

    setLoading(true); // Bắt đầu tải
    fetch('/api/auth/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (!res.ok) {
          // Xử lý lỗi HTTP (ví dụ: 400, 500)
          return res.json().then(err => Promise.reject(err));
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
        if (data.success) { // Giả định API trả về { message: "...", success: true/false }
          setIsSuccess(true);
          // Tự động chuyển hướng về trang đăng nhập sau 3 giây nếu kích hoạt thành công
          setTimeout(() => {
            router.push('/dang-nhap');
          }, 3000);
        } else {
          setIsSuccess(false);
        }
      })
      .catch((error) => {
        console.error('Lỗi kích hoạt tài khoản:', error);
        setMessage(error.message || 'Có lỗi xảy ra, vui lòng thử lại.');
        setIsSuccess(false);
      })
      .finally(() => {
        setLoading(false); // Kết thúc tải
      });
  }, [token, router]); // Thêm router vào dependencies để tránh warning

  return (
    <>
      <Head>
        <title>Kích hoạt tài khoản | Giang Nội Tiết</title>
        <meta
          name="description"
          content="Tài khoản Giang Nội Tiết của bạn đã được kích hoạt thành công. Khám phá các kiến thức chuyên sâu, tài liệu y tế về nội tiết và tiểu đường."
        />
        <meta
          name="keywords"
          content="Giang Nội Tiết, nội tiết, tiểu đường, tài khoản kích hoạt, sức khỏe, y tế"
        />
        {/* Quan trọng: Trang kích hoạt không nên được lập chỉ mục */}
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://giangnoitiet.vn/activate" />
        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Kích hoạt tài khoản | Giang Nội Tiết"
        />
        <meta
          property="og:description"
          content="Tài khoản Giang Nội Tiết của bạn đã được kích hoạt thành công. Khám phá các kiến thức chuyên sâu, tài liệu y tế về nội tiết và tiểu đường."
        />
        <meta property="og:url" content="https://giangnoitiet.vn/activate" />
        <meta property="og:type" content="website" />
        {/* Thay thế bằng hình ảnh phù hợp với Giang Nội Tiết (logo, hình ảnh y tế) */}
        <meta
          property="og:image"
          content="https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp"
        />
        <meta
          property="og:image:alt"
          content="Kích hoạt tài khoản Giang Nội Tiết"
        />
        <meta property="og:site_name" content="Giang Nội Tiết" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kích hoạt tài khoản | Giang Nội Tiết" />
        <meta name="twitter:description" content="Tài khoản Giang Nội Tiết của bạn đã được kích hoạt thành công. Khám phá kiến thức chuyên sâu về nội tiết và tiểu đường." />
        <meta name="twitter:image" content="https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp" />
      </Head>

      <div className="relative h-screen">
        {/* Ảnh nền */}
        <div className="absolute inset-0">
          <Image
            src="/dang-ky.webp" // Ảnh nền phù hợp với Giang Nội Tiết
            alt="Ảnh nền trang kích hoạt tài khoản Giang Nội Tiết"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Nội dung */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          {loading ? (
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-10 w-10 text-white mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-xl md:text-2xl font-semibold">Đang kích hoạt tài khoản của bạn...</p>
            </div>
          ) : (
            <>
              {/* Thông báo chính */}
              <h2 className={`text-3xl md:text-4xl font-semibold mb-4 ${isSuccess ? 'text-green-400' : 'text-[#00ca99]'}`}>
                {isSuccess ? 'Chào mừng bạn đến với Giang Nội Tiết!' : 'Kích hoạt tài khoản không thành công.'}
              </h2>

              {/* Mô tả hoặc chi tiết lỗi */}
              <p className="text-gray-300 text-sm md:text-lg max-w-3xl mx-auto mb-6">
                {message}
              </p>

              {/* Nút Quay về Trang Chủ */}
              <Link
                href="/"
                className="flex items-center bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                {isSuccess ? 'Quay Về Trang Chủ' : 'Quay Về Trang Chủ'}
              </Link>

              {/* Nếu kích hoạt thành công, thêm nút đi đến trang đăng nhập */}
              {isSuccess && (
                <p className="text-gray-300 text-sm mt-4">
                  Bạn sẽ được chuyển hướng đến trang đăng nhập sau vài giây... <br />
                  Hoặc click vào <Link href="/dang-nhap" className="text-blue-400 hover:underline">đây</Link> để đăng nhập ngay.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}