// pages/404.js
import Image from "next/image";
import Link from "next/link";
import Head from "next/head"; // Import Head để thêm thẻ meta
import { FaArrowLeft } from "react-icons/fa";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Trang Không Tìm Thấy | Giang Nội Tiết</title>
        {/* Thêm thẻ meta noindex để yêu cầu công cụ tìm kiếm không lập chỉ mục trang này */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="relative h-screen">
        {/* Ảnh nền */}
        <div className="absolute inset-0">
          <Image
            src="/404.webp" // Đổi ảnh background cho phù hợp với Giang Nội Tiết
            alt="Ảnh nền trang 404 của Giang Nội Tiết" // Cập nhật alt text
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Nội dung */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          {/* Văn bản 404 */}
          <h1 className="text-8xl md:text-9xl font-bold mb-4">404</h1>

          {/* Thông báo lỗi */}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Oops! Trang Không Tìm Thấy.
          </h2>

          {/* Mô tả */}
          <p className="text-gray-300 text-sm md:text-lg max-w-4xl mx-auto mb-6">
            Rất tiếc, trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra lại
            URL hoặc quay về trang chủ để tiếp tục khám phá các thông tin y tế, kiến thức chuyên sâu
            về nội tiết và tiểu đường từ Giang Nội Tiết.
          </p>

          {/* Nút Quay về Trang Chủ */}
          <Link href="/">
            <button className="flex items-center bg-[#00ca99] text-white px-6 py-3 rounded-full hover:bg-[#00ca99]/80 transition-colors">
              <FaArrowLeft className="mr-2" />
              Quay Về Trang Chủ
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}