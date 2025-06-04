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
import { readPostsFromDb, formatPosts } from "../lib/utils";
import TestimonialComponent from "../components/benhnoitiet/TestimonialComponent";
import FAQComponent from "../components/benhnoitiet/FAQComponent";
import ServicesComponent from "../components/benhnoitiet/ServicesComponent";
import ConsultationForm from "../components/tantruonggiang/ConsultationForm";


// Helper chuyển path Cloudinary
const toCloudinaryUrl = (relativePath) => {
  if (!relativePath || typeof relativePath !== "string") {
    return "/images/placeholder.jpg";
  }
  if (relativePath.includes("/image/upload/")) {
    const parts = relativePath.split("/");
    const vIdx = parts.findIndex((p) => p.startsWith("v") && !isNaN(p.slice(1)));
    if (vIdx !== -1) {
      const clean = parts.slice(vIdx + 1).join("/");
      return `https://res.cloudinary.com/dcgtt1jza/image/upload/v1/${clean}`;
    }
  }
  const clean = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  return `https://res.cloudinary.com/dcgtt1jza/image/upload/v1/${clean}`;
};

export default function Home({ posts, meta }) {
  // JSON-LD Schema.org cho Giang Nội Tiết
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Giang Nội Tiết",
    url: "https://giangnoitiet.vn",
    logo: "https://giangnoitiet.vn/logo.png",
    sameAs: [
      "https://www.facebook.com/giangnoitiet",
    ],
    description:
      "Giang Nội Tiết – Chuyên tư vấn và điều trị các bệnh nội tiết, đặc biệt là tiểu đường thai kỳ cho phụ nữ mang thai, với giải pháp y tế hiện đại và tận tâm.",
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
      <FeaturedProductsHealth />
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
  const raw = await readPostsFromDb(8, 0);
  const posts = formatPosts(raw);

  // SEO meta cho Giang Nội Tiết
  const meta = {
    title: "Giang Nội Tiết - Tư vấn bệnh nội tiết & Tiểu đường thai kỳ cho phụ nữ mang thai",
    description:
      "Giang Nội Tiết cung cấp dịch vụ tư vấn và điều trị chuyên sâu các bệnh nội tiết, đặc biệt là tiểu đường thai kỳ cho phụ nữ mang thai, với công nghệ y tế hiện đại.",
    keywords:
      "Giang Nội Tiết, bệnh nội tiết, tiểu đường thai kỳ, tư vấn sức khỏe, phụ nữ mang thai, y tế hiện đại",
    robots: "index, follow",
    author: "Giang Nội Tiết",
    canonical: "https://giangnoitiet.vn",
    og: {
      title: "Giang Nội Tiết - Tư vấn bệnh nội tiết & Tiểu đường thai kỳ cho phụ nữ mang thai",
      description:
        "Giang Nội Tiết hỗ trợ phụ nữ mang thai và bệnh nhân nội tiết với các giải pháp y tế chuyên nghiệp và tận tâm.",
      type: "website",
      image: "https://giangnoitiet.vn/baner.webp",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://giangnoitiet.vn",
    },
    twitter: {
      card: "summary_large_image",
      title: "Giang Nội Tiết - Tư vấn bệnh nội tiết & Tiểu đường thai kỳ cho phụ nữ mang thai",
      description:
        "Giang Nội Tiết – Địa chỉ tin cậy cho tư vấn và điều trị tiểu đường thai kỳ và các bệnh nội tiết.",
      image: "https://giangnoitiet.vn/baner.webp",
    },
  };

  return {
    props: { posts, meta },
  };
}