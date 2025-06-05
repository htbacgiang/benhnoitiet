import { useState, useMemo } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import { formatPosts, readAllPostsFromDb } from "../../lib/utils";
import { PostDetail } from "../../utils/types";

type MetaData = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageWidth: string;
    imageHeight: string;
    url: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
};

type Props = {
  posts: PostDetail[];
  meta: MetaData;
};

const Blogs: NextPage<Props> = ({ posts, meta }) => {
  const postsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  }, [currentPage, posts]);

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pageNumbers: (number | string)[] = [];

    pageNumbers.push(1);

    if (totalPages <= maxPagesToShow + 1) {
      for (let i = 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage <= 3) {
        startPage = 2;
        endPage = maxPagesToShow;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxPagesToShow;
        endPage = totalPages - 1;
      }

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage", // Hoặc "WebPage"
    "name": "Blog Tiểu Đường Thai Kỳ & Nội Tiết | Giang Nội Tiết",
    "description": "Trang của Blog Giang Nội Tiết: Kiến thức chuyên sâu về quản lý tiểu đường thai kỳ, dinh dưỡng và chăm sóc sức khỏe toàn diện cho bà bầu.",
    "url": "https://giangnoitiet.vn/bai-viet",
    "image": "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp", // Sử dụng ảnh banner chính của trang
    // Nếu đây là trang blog của một tổ chức y tế
    "publisher": {
      "@type": "MedicalOrganization", // Hoặc Organization
      "name": "Giang Nội Tiết",
      "url": "https://giangnoitiet.vn",
      "logo": {
        "@type": "ImageObject",
        "url": "https://giangnoitiet.vn/logo.png"
      }
    },
    // Thêm các bài viết cụ thể nếu muốn, nhưng thường không làm trên trang tổng hợp
    // "mainEntity": posts.map(post => ({
    //   "@type": "BlogPosting",
    //   "headline": post.title,
    //   "image": post.thumbnail,
    //   "url": `https://giangnoitiet.vn/bai-viet/${post.slug}`,
    //   "datePublished": post.createdAt,
    //   "author": { "@type": "Person", "name": post.author || "Giang Nội Tiết" }
    // }))
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
      <div className="relative h-[40vh] w-full">
        <Image
          src="/images/giang-noi-tiet-4.webp"
          alt="Blog về tiểu đường thai kỳ - Giangnoitiet"
          layout="fill"
          objectFit="cover"
          className="opacity-70 brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="p-6 md:p-10">
            <nav aria-label="Breadcrumb">
              <p className="text-sm uppercase text-gray-400">
                <Link href="/">
                  <span className="hover:text-yellow-500 cursor-pointer">Trang chủ</span>
                </Link>{" "}/ Blog
              </p>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Blog - Giang Nội Tiết
            </h1>
            <p className="text-lg md:text-xl text-white mt-2">
              Kiến thức chuyên sâu về quản lý tiểu đường thai kỳ, dinh dưỡng và chăm sóc sức khỏe.
            </p>
          </div>
        </div>
      </div>
      <div className="pb-12">
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-8xl mx-auto px-4 lg:px-12">
          <div className="w-full">
            {posts.length > 0 ? (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-black py-8">
                  {paginatedPosts.map((post, index) => (
                    <div key={post.slug} className="flex flex-col gap-4">
                      {post.thumbnail && (
                        <div
                          className="relative cursor-pointer rounded-lg overflow-hidden"
                          style={{ aspectRatio: "16/9" }}
                        >
                          <Link href={`/bai-viet/${post.slug}`}>
                            <Image
                              src={post.thumbnail}
                              fill
                              priority={index < 3}
                              className="object-cover hover:scale-105 transition-all ease duration-300"
                              alt={`${post.title} thumbnail`}
                            />
                          </Link>
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <p className="text-base text-black uppercase">
                          {formatDate(post.createdAt)}
                        </p>
                        <Link
                          href={`/bai-viet/${post.slug}`}
                          className="text-base md:text-base font-bold hover:text-green-600"
                          aria-label={post.title}
                        >
                          <h2>
                            {post.title}
                          </h2>
                        </Link>
                        <Link
                          href={`/bai-viet/${post.slug}`}
                          className="text-sm text-red-400 hover:text-green-600"
                        >
                          Xem thêm
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center gap-3 mt-6">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-transparent text-black border border-gray-300 hover:bg-[#00ca99] hover:text-white transition-all duration-300 disabled:opacity-50"
                      aria-label="Go to previous page"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    {getPageNumbers().map((page, index) => (
                      <div key={`${page}-${index}`}>
                        {page === "..." ? (
                          <span className="w-10 h-10 flex items-center justify-center text-sm font-medium text-black">
                            ...
                          </span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(page as number)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentPage === page
                              ? "bg-[#00ca99] text-white"
                              : "bg-transparent text-black border border-gray-300 hover:bg-[#00ca99] hover:text-white"
                              } transition-all duration-300`}
                            aria-label={`Go to page ${page}`}
                          >
                            {page}
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-transparent text-black border border-gray-300 hover:bg-[#00ca99] hover:text-white transition-all duration-300 disabled:opacity-50"
                      aria-label="Go to next page"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>Không có bài viết nào.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout2>
  );
};

export const getServerSideProps: GetServerSideProps<{
  posts: PostDetail[];
  meta: MetaData;
}> = async () => {
  try {
    const posts = await readAllPostsFromDb(); // Fetch all posts
    const formattedPosts: PostDetail[] = formatPosts(posts);
    const meta: MetaData = {
      title: "Blog Tiểu Đường Thai Kỳ - Giang Nội Tiết",
      description:
        "Cung cấp giải pháp toàn diện giúp bà bầu quản lý tiểu đường thai kỳ, đảm bảo sức khỏe cho mẹ và bé thông qua tư vấn chuyên sâu, dinh dưỡng và chăm sóc tinh thần.",
      keywords:
        "tiểu đường thai kỳ, sức khỏe bà bầu, dinh dưỡng thai kỳ, tư vấn sức khỏe, chăm sóc tinh thần, Giangnoitiet",
      author: "Giangnoitiet",
      robots: "index, follow",
      canonical: "https://giangnoitiet.vn/bai-viet",
      og: {
        title: "Blog Tiểu Đường Thai Kỳ - Giang Nội Tiết",
        description:
          "Khám phá các giải pháp toàn diện về tiểu đường thai kỳ, dinh dưỡng và chăm sóc tinh thần cho bà bầu tại Giangnoitiet.",
        type: "website",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://giangnoitiet.vn/bai-viet",
        siteName: "Giangnoitiet",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog Tiểu Đường Thai Kỳ - Giang Nội Tiết",
        description:
          "Tìm hiểu các giải pháp quản lý tiểu đường thai kỳ, dinh dưỡng và chăm sóc tinh thần cho bà bầu tại Giangnoitiet.",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.webp",
      },
    };

    return {
      props: {
        posts: formattedPosts,
        meta,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { notFound: true };
  }
};

export default Blogs;