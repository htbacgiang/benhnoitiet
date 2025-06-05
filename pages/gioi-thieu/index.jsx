import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import { useState, useEffect } from "react";
import ConsultationForm from "../../components/tantruonggiang/ConsultationForm";
import FoviaAboutUsComponent from "../../components/benhnoitiet/FoviaAboutUsComponent";
import MissionComponent from "../../components/benhnoitiet/MissionComponent";
import FreelancerComponent from "../../components/benhnoitiet/FreelancerComponent";
import FAQComponent from "../../components/benhnoitiet/FAQComponent";

export default function AboutUs({ meta }) {
  const [runAnimation, setRunAnimation] = useState(false);

  useEffect(() => {
    setRunAnimation(true);
  }, []);
  // JSON-LD Schema.org cho trang "Về Chúng Tôi" (MedicalOrganization hoặc Person)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization", // Hoặc "Person" nếu Giang Nội Tiết là một cá nhân bác sĩ
    "name": "Giang Nội Tiết",
    "url": "https://giangnoitiet.vn/gioi-thieu",
    "logo": "https://giangnoitiet.vn/logo-giang-noi-tiet-2.png", // Đảm bảo URL logo này là đúng
    "image": "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp", // Sử dụng ảnh banner chính của trang
    "description": "Tìm hiểu về Giang Nội Tiết – Chuyên gia hàng đầu trong tư vấn tiểu đường thai kỳ, rối loạn nội tiết. Khám phá hành trình trở thành chuyên gia và sứ mệnh của chúng tôi.",
    "sameAs": [
      "https://www.facebook.com/giangnoitiet",
      // Thêm các liên kết mạng xã hội khác nếu có
    ],
    // "foundingDate": "20XX-YY-ZZ", // Nếu biết ngày thành lập/khởi đầu
    // Nếu là Person (cá nhân bác sĩ)
    // "@type": "Person",
    // "name": "Nguyễn Thị Giang", // Tên đầy đủ của bác sĩ Giang
    // "alumniOf": "Tên trường đại học y/bệnh viện",
    // "jobTitle": "Chuyên gia Nội Tiết",
    // "worksFor": {
    //   "@type": "Organization",
    //   "name": "Giang Nội Tiết"
    // }
  };
  return (
    <DefaultLayout2>
      <Head>
        {/* JSON-LD Schema.org cho trang Về Chúng Tôi */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      {/* Hero Section */}
      <section className="relative h-[200px] md:h-[300px] bg-[#F5F5F5]">
        <div className="absolute inset-0">
          <Image
            src="/images/5.jpg"
            alt="Giang Nội Tiết - Tư vấn tiểu đường thai kỳ"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-[#333333]">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#A2CFFE]">Về Giang Nội Tiết</h1>
          <nav aria-label="Breadcrumb" className="text-white">
            <Link href="/">
              <span className="hover:text-[#FFD1DC] cursor-pointer">
                Trang Chủ
              </span>
            </Link>
            <span className="mx-2">/</span>
            <span>Về Chúng Tôi</span>
          </nav>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <FoviaAboutUsComponent />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
            {/* Left Column: Text Content and Image 1 */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-[#333333] mb-4">
                  Hành trình trở thành chuyên gia Nội Tiết
                </h2>
                <p className="text-[#666666] text-sm md:text-lg mb-6">
                  Xuất phát điểm của tôi không phải là một bác sĩ, mà là một điều dưỡng chuyên sâu về nội tiết sinh sản. Nhưng chính quá trình làm việc tại Bệnh viện Nội Tiết Trung Ương, tiếp xúc với hàng nghìn bệnh nhân nữ đã giúp tôi nhận ra một sự thật quan trọng: <b>Phụ nữ hiện đại đang phải đối mặt với rất nhiều vấn đề về nội tiết nhưng chưa thực sự hiểu và quan tâm đúng mức.</b>
                </p>
              </div>
              <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/5.jpg"
                  alt="Điều dưỡng tư vấn tiểu đường thai kỳ"
                  layout="fill"
                  objectFit="cover"
                  className={`brightness-75 ${runAnimation ? "animate-slide-in-from-right" : ""}`}
                />
              </div>
            </div>

            {/* Right Column: Image 2 and Features */}
            <div className="space-y-6">
              <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/6.jpg"
                  alt="Sức khỏe mẹ bầu và tiểu đường thai kỳ"
                  layout="fill"
                  objectFit="cover"
                  className={`brightness-75 ${runAnimation ? "animate-slide-in-from-left" : ""}`}
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#333333] mb-4">
                  Bắt đầu hành trình chăm sóc nội tiết ngay hôm nay!
                </h3>
                <p className="text-[#666666] text-sm md:text-lg mb-4">
                  Nếu bạn đang gặp phải rối loạn kinh nguyệt, mất ngủ, khô hạn, suy giảm ham muốn, mệt mỏi, tăng cân không kiểm soát… <b>ĐỪNG CHỦ QUAN!</b>
                  <br />
                  🌸 Nội tiết là nền tảng của sức khỏe và sắc đẹp. Nếu bạn không chăm sóc ngay từ bây giờ, cơ thể bạn sẽ xuống dốc nhanh chóng mà bạn không nhận ra.
                  <br />
                  Hãy cùng tôi tìm hiểu và chăm sóc nội tiết đúng cách, để luôn khỏe mạnh, trẻ trung và tràn đầy sức sống trong mọi giai đoạn cuộc đời!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8">
        <FreelancerComponent />
        <MissionComponent />
        <ConsultationForm />
        <FAQComponent />
      </section>
    </DefaultLayout2>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Về Giang Nội Tiết - Chuyên gia Tiểu Đường Thai kỳ & Rối loạn Nội tiết", // Tối ưu tiêu đề: Rõ ràng, chứa từ khóa, nhấn mạnh vai trò
    description:
      "Tìm hiểu về Giang Nội Tiết – Chuyên gia hàng đầu trong tư vấn tiểu đường thai kỳ, rối loạn nội tiết. Khám phá hành trình trở thành chuyên gia, sứ mệnh và cam kết của chúng tôi.", // Mô tả: Cụ thể, hấp dẫn, chứa từ khóa chính, độ dài phù hợp
    keywords:
      "Giang Nội Tiết, tiểu đường thai kỳ, rối loạn nội tiết, tư vấn sức khỏe phụ nữ, hành trình chuyên gia nội tiết, điều dưỡng nội tiết, sứ mệnh y tế", // Thêm từ khóa đa dạng, liên quan đến nội dung "Về chúng tôi"
    robots: "index, follow",
    author: "Giang Nội Tiết",
    canonical: "https://giangnoitiet.vn/gioi-thieu", // Đảm bảo URL canonical chính xác
    og: {
      title: "Về Giang Nội Tiết - Chuyên gia Tiểu Đường Thai kỳ & Rối loạn Nội tiết",
      description:
        "Khám phá hành trình, sứ mệnh và cam kết của Giang Nội Tiết trong việc tư vấn chuyên sâu về tiểu đường thai kỳ và rối loạn nội tiết, đồng hành cùng sức khỏe phụ nữ Việt.",
      type: "website", // Hoặc "profile" nếu trang này giới thiệu về một cá nhân
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp", // Ảnh đại diện cho trang "Về Chúng Tôi" (khác với homepage)
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://giangnoitiet.vn/gioi-thieu",
    },
    twitter: {
      card: "summary_large_image",
      title: "Về Giang Nội Tiết - Chuyên gia Tiểu Đường Thai kỳ & Rối loạn Nội tiết",
      description:
        "Tìm hiểu về Giang Nội Tiết – Chuyên gia hàng đầu trong tư vấn và điều trị tiểu đường thai kỳ, rối loạn nội tiết. Đồng hành cùng sức khỏe phụ nữ Việt.",
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp",
    },
  };

  return {
    props: {
      meta,
    },
  };
}