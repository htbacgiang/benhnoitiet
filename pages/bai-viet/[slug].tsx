import {
  GetServerSideProps,
  NextPage,
} from "next";
import parse from "html-react-parser";
import Head from "next/head"; // Import Head để đặt các thẻ meta
import DefaultLayout from "../../components/layout/DefaultLayout";
import db from "../../utils/db"; // MongoDB connection
import Post from "../../models/Post"; // Mongoose Model
import Share from "../../components/common/Share";
import Link from "next/link";
import Image from "next/image";
import { trimText } from "../../utils/helper"; // Có thể bỏ nếu không cần trim tiêu đề dài trên breadcrumb

type PostData = {
  id: string;
  title: string;
  content: string;
  meta: string; // Đây là description SEO của bài viết
  tags: string[];
  slug: string;
  thumbnail: string;
  createdAt: string;
  category: string;
  recentPosts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    thumbnail?: string;
    createdAt: string;
  }[];
};

type MetaData = {
  title: string;
  description: string;
  author: string;
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
  post: PostData;
  meta: MetaData;
};

// Đặt host cho Giang Nội Tiết
const currentHost = "https://giangnoitiet.vn";

// Tên ứng dụng/website
export const APP_NAME = "Giang Nội Tiết";

const SinglePost: NextPage<Props> = ({ post, meta }) => { // Nhận cả meta prop
  const { title, content, slug, thumbnail, category, createdAt, recentPosts } = post;

  // JSON-LD Schema.org cho bài viết (BlogPosting)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting", // Hoặc "Article"
    "mainEntityOfPage": {
      "@type": "WebPage",
    },
    "headline": title,
    "image": thumbnail, // Sử dụng thumbnail bài viết hoặc ảnh OG mặc định
    "datePublished": createdAt,
    "dateModified": createdAt, // Nếu có ngày cập nhật, thì thay bằng nó
    "author": {
      "@type": "Person",
      "name": "Giang Nội Tiết" // Tên tác giả (Giang Nội Tiết hoặc tên cụ thể)
    },
    "publisher": {
      "@type": "MedicalOrganization", // Hoặc Organization
      "name": APP_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": "https://giangnoitiet.vn/logo.png" // URL logo của bạn
      }
    },
    "description": meta,
    "articleBody": content.replace(/<[^>]*>?/gm, ''), // Nội dung bài viết dạng plain text
    // Các thuộc tính bổ sung nếu có (ví dụ: keywords, wordCount)
  };

  // Hàm format ngày tháng cho hiển thị
  const formatDisplayDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  return (
    <DefaultLayout> 
      {/* JSON-LD Schema.org cho bài viết */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Main Content - 75% width on md and up */}
          <article className="w-full md:w-3/4 pr-0 md:pr-8 mb-4 md:mb-0"> {/* Sử dụng <article> */}
            <div className="md:pb-20 pb-6 container mx-auto mt-[60px] sm:mt-[91px]">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="flex font-semibold gap-2 text-base text-gray-600 mb-4">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link href="/" className="hover:text-blue-800 whitespace-nowrap">
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-400">›</span>
                  </li>
                  <li>
                    <Link href="/bai-viet" className="hover:text-blue-800 whitespace-nowrap">
                      Bài viết
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-400">›</span>
                  </li>
                  <li aria-current="page">
                    <span className="font-bold text-gray-800 line-clamp-1"> {/* Sử dụng line-clamp */}
                      {title}
                    </span>
                  </li>
                </ol>
              </nav>

              {/* Tiêu đề bài viết - Đây là H1 DUY NHẤT của trang */}
              <h1 className="md:text-3xl text-xl font-bold text-primary-dark dark:text-primary mb-4">
                {title}
              </h1>

              {/* Thông tin bài viết và chia sẻ */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <span className="uppercase text-green-800 font-bold mr-2">{category}</span>
                  <span className="text-gray-500"> | </span>
                  <time dateTime={createdAt} className="ml-2 text-gray-600">
                    {formatDisplayDate(createdAt)}
                  </time>
                </div>
                <Share url={`${currentHost}/bai-viet/${slug}`} /> {/* Sử dụng currentHost */}
              </div>

              {/* Hình ảnh thumbnail chính của bài viết (nếu có) */}
              {thumbnail && (
                <div className="relative w-full h-[250px] md:h-[400px] mb-6 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={thumbnail}
                    alt={title} // Alt text nên là tiêu đề bài viết
                    layout="fill"
                    objectFit="cover"
                    priority // Ưu tiên tải ảnh chính của bài viết
                  />
                </div>
              )}

              {/* Nội dung bài viết */}
              <div className="blog prose prose-lg dark:prose-invert max-w-full"> {/* Đảm bảo max-w-full để nội dung responsive */}
                {parse(content)}
              </div>
            </div>
          </article>

          {/* Recent Posts Section - 25% width on md and up */}
          <aside className="w-full md:w-1/4 px-0.5 md:mt-[91px] mt-10"> {/* Sử dụng <aside> */}
            <div className="pt-5">
              <h2 className="text-2xl font-semibold text-primary-dark dark:text-primary p-2 mb-4"> {/* H2 cho phần phụ */}
                Bài viết gần đây
              </h2>
              <div className="flex flex-col space-y-4">
                {recentPosts.map((p) => (
                  <Link key={p.slug} href={`/bai-viet/${p.slug}`} passHref legacyBehavior>
                    <a className="flex items-center space-x-3 group w-full">
                      {p.thumbnail && (
                        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={p.thumbnail}
                            alt={`Thumbnail bài viết: ${p.title}`} // Alt text rõ ràng hơn
                            fill
                            sizes="80px" // Kích thước cố định cho ảnh thumbnail
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex flex-col flex-1">
                        <span className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {p.title}
                        </span>
                        <div className="text-sm flex items-center mt-1 gap-1 text-gray-500"> {/* Giảm kích thước font, đổi màu */}
                          <svg
                            className="w-4 h-4 text-orange-700 flex-shrink-0" // Màu icon và không co lại
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          <time dateTime={p.createdAt}>
                            {formatDisplayDate(p.createdAt)}
                          </time>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SinglePost;

export const getServerSideProps: GetServerSideProps<
  { post: PostData; meta: MetaData },
  { slug: string }
> = async ({ params }) => {
  try {
    await db.connectDb(); // Đảm bảo kết nối database

    const post = await Post.findOne({ slug: params?.slug }).lean(); // Sử dụng .lean() để lấy plain JS object, tốt hơn cho hiệu suất
    if (!post) {
      console.log(`Post not found for slug: ${params?.slug}`);
      return { notFound: true };
    }

    const posts = await Post.find({
      _id: { $ne: post._id }, // Lấy các bài viết khác bài hiện tại
    })
      .sort({ createdAt: -1 }) // Sắp xếp theo ngày tạo mới nhất
      .limit(5) // Lấy 5 bài gần đây
      .select("slug title thumbnail category createdAt")
      .lean(); // .lean() cho hiệu suất

    const recentPosts = posts.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      category: p.category || "Chung", // Gán "Chung" nếu không có category
      thumbnail: p.thumbnail?.url || "/images/placeholder.jpg", // Đảm bảo có ảnh placeholder
      createdAt: p.createdAt.toISOString(), // Chuyển đổi sang ISO string cho nhất quán
    }));

    // Lấy thông tin bài viết hiện tại
    const { _id, title, content, meta, slug, tags, thumbnail, category, createdAt } = post;

    // META DATA CHO TRANG BÀI VIẾT ĐƠN
    const metaData: MetaData = {
      title: `${title}`, // Tối ưu tiêu đề: "[Tiêu đề bài viết] | Blog Giang Nội Tiết"
      description: meta || trimText(content.replace(/<[^>]*>?/gm, ' '), 150), // Sử dụng meta từ DB, nếu không có thì lấy 150 ký tự đầu của content (đã loại bỏ HTML)
      author: "Giang Nội Tiết", // Đảm bảo tác giả là "Giang Nội Tiết" hoặc tên tác giả cụ thể
      canonical: `${currentHost}/bai-viet/${slug}`, // Canonical URL đúng cho Giang Nội Tiết
      og: {
        title: `${title} | Blog Giang Nội Tiết`,
        description: meta || trimText(content.replace(/<[^>]*>?/gm, ' '), 150),
        type: "article", // Loại là "article" cho bài viết
        image: thumbnail?.url || `${currentHost}/images/default-blog-thumbnail.jpg`, // Ảnh thumbnail của bài viết hoặc ảnh mặc định
        imageWidth: "1200",
        imageHeight: "630",
        url: `${currentHost}/bai-viet/${slug}`,
        siteName: APP_NAME, // Tên website Giang Nội Tiết
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Blog Giang Nội Tiết`,
        description: meta || trimText(content.replace(/<[^>]*>?/gm, ' '), 150),
        image: thumbnail?.url || `${currentHost}/images/default-blog-thumbnail.jpg`,
      },
    };

    const postData: PostData = {
      id: _id.toString(),
      title,
      content,
      meta, // Giữ lại meta từ DB nếu bạn muốn dùng nó làm description SEO
      slug,
      tags,
      category: category || "Chung", // Gán "Chung" nếu không có category
      thumbnail: thumbnail?.url || "", // Gán rỗng nếu không có
      createdAt: createdAt.toISOString(), // Đảm bảo là ISO string
      recentPosts,
    };

    return {
      props: {
        post: postData,
        meta: metaData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    await db.disconnectDb(); // Đảm bảo ngắt kết nối database nếu có lỗi
    return { notFound: true };
  } finally {
    await db.disconnectDb(); // Đảm bảo ngắt kết nối database
  }
};