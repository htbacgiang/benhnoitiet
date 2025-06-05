import Head from "next/head";
import DefaultLayout from "../components/layout/DefaultLayout";
import AboutSection from "../components/benhnoitiet/AboutSection";
import GestationalDiabetesCalculator from "../components/benhnoitiet/GestationalDiabetesCalculator";
import TelehealthSection from "../components/benhnoitiet/TelehealthSection";
import PregnancyJourney from "../components/benhnoitiet/PregnancyJourney";
import FeaturedProductsHealth from "../components/benhnoitiet/FeaturedProductsHealth";
import HeroSectionBlog from "../components/ecobacgiang/HeroSectionBlog";
import FreelancerComponent from "../components/benhnoitiet/FreelancerComponent";
import PostCard from "../components/common/PostCard";
import Banner from "../components/benhnoitiet/Banner";
import { readAllPostsFromDb, formatPosts } from "../lib/utils";
import TestimonialComponent from "../components/benhnoitiet/TestimonialComponent";
import FAQComponent from "../components/benhnoitiet/FAQComponent";
import ServicesComponent from "../components/benhnoitiet/ServicesComponent";
import ConsultationForm from "../components/tantruonggiang/ConsultationForm";

export default function Home({ posts, meta }) {
  // JSON-LD Schema.org cho Giang Nội Tiết
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization", // Hoặc "Physician" nếu đây là trang cá nhân của bác sĩ Giang
    "name": "Giang Nội Tiết",
    "url": "https://giangnoitiet.vn",
    "logo": "https://giangnoitiet.vn/logo-giang-noi-tiet-2.png", // Đảm bảo URL logo này là đúng
    "image": "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp", // Sử dụng ảnh banner chính của trang
    "description": "Giang Nội Tiết – Chuyên gia tư vấn và điều trị bệnh nội tiết, đặc biệt là tiểu đường thai kỳ cho phụ nữ mang thai, với giải pháp y tế hiện đại, chuyên nghiệp và tận tâm.",
    "sameAs": [
      "https://www.facebook.com/giangnoitiet",
      // Thêm các đường dẫn mạng xã hội khác nếu có (LinkedIn, Zalo OA...)
    ],
    // Thêm thông tin liên hệ và địa chỉ (nếu là phòng khám/tổ chức cụ thể)
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84948907686", // Thay bằng số điện thoại liên hệ
      "contactType": "customer service",
      "areaServed": "VN", // Quốc gia phục vụ
      "availableLanguage": ["Vietnamese"]
    },
    // Nếu có địa chỉ vật lý (ví dụ: phòng khám)
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Đồng Sung, Đồng Tân", // Thay bằng địa chỉ cụ thể
      "addressLocality": "Ứng Hòa",
      "addressRegion": "Hà Nội",
      "postalCode": "Mã bưu chính (nếu có)",
      "addressCountry": "VN"
    },
    "hasMap": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4504.736611381864!2d105.83786291145768!3d20.70699069867129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135cb7bf100f7d1%3A0x97cceeb460f2b6ec!2zR2lhbmcgTuG7mWkgVGnhur90IC0gQ2jEg20gU8OzYyBT4bupYyBLaG_hursgUGjhu6UgTuG7rw!5e1!3m2!1svi!2s!4v1748745832002!5m2!1svi!2s",
  };


  return (
    <DefaultLayout meta={meta}>
      <Head>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      </Head>
      <h1 className="hidden">
        Giang Nội Tiết - Tư vấn bệnh nội tiết & Tiểu đường thai kỳ cho phụ nữ mang thai
      </h1>
      <Banner />
      <AboutSection />
      <GestationalDiabetesCalculator />
      <ServicesComponent />
      <FreelancerComponent />
      <FAQComponent />
      <TelehealthSection />
      <PregnancyJourney />
      {/* <FeaturedProductsHealth /> */}
      <TestimonialComponent />
      <HeroSectionBlog />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3  pb-6">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
      <ConsultationForm />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  // Lấy bài viết và format
  const raw = await readAllPostsFromDb(); // Fetch all posts
  const posts = formatPosts(raw);

  const meta = {
    title: "Giang Nội Tiết: Tư vấn Tiểu đường Thai kỳ, Bệnh Nội tiết chuyên sâu", // Tiêu đề tối ưu: ngắn gọn, chứa từ khóa chính, truyền tải chuyên môn
    description:
      "Giang Nội Tiết cung cấp dịch vụ tư vấn chuyên sâu các bệnh nội tiết, đặc biệt là tiểu đường thai kỳ. Giải pháp y tế hiện đại, chuyên nghiệp, tận tâm cho phụ nữ mang thai và người bệnh tại Việt Nam.", // Mô tả: hấp dẫn, chứa từ khóa, dài vừa phải (150-160 ký tự), thêm yếu tố địa lý nếu có
    keywords:
      "Giang Nội Tiết, tiểu đường thai kỳ, bệnh nội tiết, tư vấn sức khỏe, điều trị nội tiết, phụ nữ mang thai, y tế chuyên sâu, bác sĩ nội tiết, phòng khám nội tiết", // Thêm từ khóa đa dạng hơn
    robots: "index, follow",
    author: "Giang Nội Tiết",
    canonical: "https://giangnoitiet.vn", // Đảm bảo URL này là chuẩn và không có `/` thừa ở cuối nếu không cần
    og: {
      title: "Giang Nội Tiết: Tư vấn Tiểu đường Thai kỳ, Bệnh Nội tiết chuyên sâu",
      description:
        "Giang Nội Tiết hỗ trợ phụ nữ mang thai và bệnh nhân nội tiết với các giải pháp y tế chuyên nghiệp và tận tâm tại Việt Nam. Tìm hiểu thêm về dịch vụ của chúng tôi.",
      type: "website",
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp", // URL ảnh banner chính thức, chất lượng cao
      imageWidth: "1200", // Kích thước chuẩn cho ảnh OG
      imageHeight: "630",
      url: "https://giangnoitiet.vn",
    },
    twitter: {
      card: "summary_large_image",
      title: "Giang Nội Tiết: Tư vấn Tiểu đường Thai kỳ, Bệnh Nội tiết chuyên sâu",
      description:
        "Giang Nội Tiết – Địa chỉ tin cậy cho tư vấn tiểu đường thai kỳ và các bệnh nội tiết. Đảm bảo sức khỏe tốt nhất cho bạn tại Việt Nam.",
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp", // Giống ảnh OG
    },
  };

  return {
    props: { posts, meta },
  };
}