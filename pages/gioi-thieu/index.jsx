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

  return (
    <DefaultLayout2>
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] bg-[#F5F5F5]">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#A2CFFE]">Về Giang Nội Tiết</h1>
          <nav aria-label="Breadcrumb" className="text-[#666666]">
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
                <h2 className="text-2xl font-semibold text-[#333333] mb-4">
                  Bắt đầu hành trình chăm sóc nội tiết ngay hôm nay!
                </h2>
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
    title: "Giới Thiệu Giang Nội Tiết - Tư Vấn Tiểu Đường Thai Kỳ",
    content:
      "Giang Nội Tiết – Chuyên gia tư vấn tiểu đường thai kỳ và rối loạn nội tiết, hỗ trợ sức khỏe cho mẹ bầu. Khám phá hành trình chăm sóc nội tiết chuyên sâu!",
    keywords:
      "tiểu đường thai kỳ, rối loạn nội tiết, tư vấn sức khỏe bà bầu, nội tiết sinh sản, Giang Nội Tiết",
    robots: "index, follow",
    author: "Giang Nội Tiết",
    canonical: "https://giangnoitiet.vn/gioi-thieu",
    og: {
      title: "Giang Nội Tiết – Tư Vấn Tiểu Đường Thai Kỳ",
      description:
        "Khám phá dịch vụ tư vấn chuyên sâu về tiểu đường thai kỳ và rối loạn nội tiết từ Giang Nội Tiết, đồng hành cùng sức khỏe mẹ và bé.",
      type: "website",
      image: "https://giangnoitiet.vn/images/giang-noi-tiet.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://giangnoitiet.vn/gioi-thieu",
    },
    twitter: {
      card: "summary_large_image",
      title: "Giới Thiệu Giang Nội Tiết - Tư Vấn Tiểu Đường Thai Kỳ",
      description:
        "Giang Nội Tiết – Chuyên gia tư vấn tiểu đường thai kỳ và rối loạn nội tiết, mang đến sức khỏe và sự tự tin cho mẹ bầu.",
      image: "https://giangnoitiet.vn/images/giang-noi-tiet.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}