import Head from "next/head";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ContactForm from "../../components/header/ContactForm";
import Link from "next/link";
import Image from "next/image";
const contactInfo = {
  address: "Đồng Tân, Ứng Hòa, Hà Nội",
  email: "lienhe@giangnoitiet.vn",
  phone: "0949.907.686",
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://giangnoitiet.vn";

export default function ContactPage({ meta }) {
  return (
    <>
      <DefaultLayout>
     
        <section className="min-h-screen py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-black text-center mb-10 mt-10 md:mt-20">
              Thông tin liên hệ
            </h1>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center mb-8 ">
              <div
                className="p-6 sm:p-8 rounded-lg text-center w-full max-w-sm shadow-md"
                role="region"
                aria-label="Thông tin địa chỉ"
              >
                <div className="text-[#00ca99] text-4xl mb-4 flex justify-center">
                  <MdLocationOn aria-hidden="true" />
                </div>
                <p className="text-gray-400">{contactInfo.address}</p>
              </div>
              <div
                className="p-6 sm:p-8 rounded-lg text-center w-full max-w-sm shadow-md"
                role="region"
                aria-label="Thông tin email"
              >
                <div className="text-[#00ca99] text-4xl mb-4 flex justify-center">
                  <MdEmail aria-hidden="true" />
                </div>
                <p className="text-gray-400">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-[#00ca99] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00ca99]"
                    aria-label={`Gửi email đến ${contactInfo.email}`}
                  >
                    {contactInfo.email}
                  </a>
                </p>
              </div>
              <div
                className=" p-6 sm:p-8 rounded-lg text-center w-full max-w-sm shadow-md"
                role="region"
                aria-label="Thông tin số điện thoại"
              >
                <div className="text-[#00ca99] text-4xl mb-4 flex justify-center">
                  <MdPhone aria-hidden="true" />
                </div>
                <p className="text-gray-400">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-[#00ca99] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00ca99]"
                    aria-label={`Gọi số ${contactInfo.phone}`}
                  >
                    {contactInfo.phone}
                  </a>
                </p>
              </div>
            </div>
            {/* Full-screen Google Maps */}
            <div className="w-full h-[500px] mb-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4504.736611381864!2d105.83786291145768!3d20.70699069867129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135cb7bf100f7d1%3A0x97cceeb460f2b6ec!2zR2lhbmcgTuG7mWkgVGnhur90IC0gQ2jEg20gU8OzYyBT4bupYyBLaG_hursgUGjhu6UgTuG7rw!5e1!3m2!1svi!2s!4v1748745832002!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Giang Nội Tiết"
              ></iframe>
            </div>

            <ContactForm />
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Liên Hệ – Giang Nội Tiết",
    description:
      "Liên hệ với Giang Nội Tiết qua địa chỉ, email và số điện thoại. Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp thắc mắc của bạn về các sản phẩm sức khỏe.",
    keywords:
      "liên hệ, Giang Nội Tiết, địa chỉ, email, số điện thoại, sức khỏe, sản phẩm nội tiết",
    author: "Giang Nội Tiết",
    robots: "index, follow",
    canonical: `${BASE_URL}/lien-he`,
    og: {
      title: "Liên Hệ – Giang Nội Tiết",
      description:
        "Liên hệ với Giang Nội Tiết qua địa chỉ, email và số điện thoại để được tư vấn về sản phẩm sức khỏe chất lượng cao.",
      type: "website",
      image: `${BASE_URL}/images/anh-bia-giang-noi-tiet.webp`,
      imageWidth: "1200",
      imageHeight: "630",
      url: `${BASE_URL}/lien-he`,
      siteName: "Giang Nội Tiết",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Liên Hệ – Giang Nội Tiết",
      description:
        "Liên hệ với Giang Nội Tiết để được tư vấn về các sản phẩm sức khỏe chất lượng cao.",
      image: `${BASE_URL}/images/anh-bia-giang-noi-tiet.webp`,
      site: "@GiangNoiTiet",
    },
  };

  return { props: { meta } };
}