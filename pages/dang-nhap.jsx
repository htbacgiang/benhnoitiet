// pages/signin.js
import { useState } from "react";
import Head from "next/head"; // Đảm bảo đã import Head
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

// Schema xác thực với Yup (giữ nguyên)
const loginValidation = Yup.object({
  login_email: Yup.string()
    .required("Vui lòng nhập email hoặc số điện thoại.")
    .test("is-email-or-phone", "Vui lòng nhập email hoặc số điện thoại hợp lệ.", (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,11}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  login_password: Yup.string().required("Vui lòng nhập mật khẩu."),
});

export default function Signin({ providers, callbackUrl, csrfToken }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Tải email/số điện thoại từ localStorage
  const initialValues = {
    login_email: typeof window !== "undefined" ? localStorage.getItem("savedEmail") || "" : "",
    login_password: "",
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setStatus("Đang đăng nhập...");
    setSubmitting(true);

    try {
      const isPhone = /^[0-9]{10,11}$/.test(values.login_email);
      const res = await signIn("credentials", {
        redirect: false,
        email: isPhone ? null : values.login_email,
        phone: isPhone ? values.login_email : null,
        password: values.login_password,
        callbackUrl,
      });

      if (res?.error) {
        const errorMessages = {
          CredentialsSignin: "Email hoặc mật khẩu không đúng.",
          Default: "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.",
        };
        const errorMessage = errorMessages[res.error] || errorMessages.Default;
        setStatus(`Lỗi: ${errorMessage}`);
        toast.error(errorMessage);
      } else {
        setStatus("Đăng nhập thành công!");
        toast.success("Đăng nhập thành công!");
        if (rememberMe) {
          localStorage.setItem("savedEmail", values.login_email);
        } else {
          localStorage.removeItem("savedEmail");
        }
        setTimeout(() => router.push(callbackUrl || "/dashboard"), 1000);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi đăng nhập"}`);
      toast.error(error.message || "Đã xảy ra lỗi");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialSignIn = async (providerId) => {
    setStatus(`Đang đăng nhập bằng ${providerId}...`);
    try {
      const res = await signIn(providerId, { redirect: false, callbackUrl });
      if (res?.error) {
        setStatus(`Lỗi: ${res.error}`);
        toast.error(`Lỗi khi đăng nhập bằng ${providerId}: ${res.error}`);
      } else {
        setStatus("Đăng nhập thành công!");
        toast.success(`Đăng nhập bằng ${providerId} thành công!`);
        setTimeout(() => router.push(callbackUrl || "/dashboard"), 1000);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi đăng nhập"}`);
      toast.error(`Lỗi khi đăng nhập bằng ${providerId}`);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập - Giang Nội Tiết</title>
        <meta
          name="description"
          content="Đăng nhập vào tài khoản Giang Nội Tiết để quản lý thông tin sức khỏe, theo dõi tiến trình và truy cập các tài liệu chuyên sâu về nội tiết và tiểu đường."
        />
        <meta
          name="keywords"
          content="Giang Nội Tiết, đăng nhập, tài khoản sức khỏe, nội tiết, tiểu đường, y tế, quản lý bệnh"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Quan trọng: Trang đăng nhập KHÔNG NÊN được Google lập chỉ mục */}
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Đăng nhập - Giang Nội Tiết" />
        <meta
          property="og:description"
          content="Đăng nhập vào Giang Nội Tiết để quản lý thông tin sức khỏe, theo dõi tiến trình và truy cập các tài liệu chuyên sâu về nội tiết và tiểu đường."
        />
        <meta property="og:type" content="website" />
        {/* Đảm bảo URL này là URL chính xác của trang đăng nhập trên Giang Nội Tiết */}
        <meta property="og:url" content="https://giangnoitiet.vn/dang-nhap" />
        {/* Thay thế bằng hình ảnh phù hợp với Giang Nội Tiết, ví dụ: logo, hình ảnh liên quan đến sức khỏe/y tế */}
        <meta property="og:image" content="/images/giang-noi-tiet-logo.jpg" />
        <meta property="og:site_name" content="Giang Nội Tiết" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Đăng nhập - Giang Nội Tiết" />
        <meta
          name="twitter:description"
          content="Đăng nhập tài khoản Giang Nội Tiết để theo dõi sức khỏe nội tiết và tiểu đường."
        />
        {/* Thay thế bằng hình ảnh phù hợp với Giang Nội Tiết */}
        <meta name="twitter:image" content="/images/giang-noi-tiet-logo.jpg" />
        {/* Thay thế bằng favicon của Giang Nội Tiết */}
        <link rel="icon" href="/favicon-giangnoitiet.ico" /> 
        {/* URL Canonical của trang đăng nhập */}
        <link rel="canonical" href="https://giangnoitiet.vn/dang-nhap" />
        <meta httpEquiv="content-language" content="vi" />
        {/* Schema Markup cho WebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Đăng nhập - Giang Nội Tiết",
            description:
              "Đăng nhập vào tài khoản Giang Nội Tiết để quản lý thông tin sức khỏe, theo dõi tiến trình và truy cập các tài liệu chuyên sâu về nội tiết và tiểu đường.",
            url: "https://giangnoitiet.vn/signin",
            publisher: {
              "@type": "Organization",
              name: "Giang Nội Tiết",
              logo: {
                "@type": "ImageObject",
                url: "/images/giang-noi-tiet-logo.png", // Đảm bảo đường dẫn này đúng
              },
            },
          })}
        </script>
      </Head>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <section
        className="min-h-screen flex items-center justify-center relative"
        style={{
          // Đổi ảnh nền cho phù hợp với Giang Nội Tiết
          backgroundImage: `url('/dang-ky.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md relative z-10 opacity-90">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Đăng Nhập</h2>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={loginValidation}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

                {/* Email hoặc Số điện thoại */}
                <div className="relative">
                  <label htmlFor="login_email" className="block text-white text-sm mb-2">
                    Email hoặc Số điện thoại <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800 gap-4">
                    <span className="pl-3 text-orange-500">
                      <FaEnvelope />
                    </span>
                    <Field
                      id="login_email"
                      name="login_email"
                      type="text"
                      className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Email hoặc Số điện thoại"
                      required
                    />
                  </div>
                  <ErrorMessage
                    name="login_email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Mật khẩu */}
                <div className="relative">
                  <label htmlFor="login_password" className="block text-white text-sm mb-2">
                    Mật khẩu <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800 gap-4">
                    <span className="pl-3 text-orange-500">
                      <FaLock />
                    </span>
                    <Field
                      id="login_password"
                      name="login_password"
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Mật khẩu"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="pr-3 text-gray-400 hover:text-white"
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="login_password"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Lưu thông tin */}
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    name="remember_me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="remember_me" className="ml-2 text-white text-sm">
                    Lưu thông tin đăng nhập
                  </label>
                </div>

                {/* Thông báo trạng thái */}
                {status && (
                  <p
                    className={`text-center ${
                      status.includes("thành công") ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {status}
                  </p>
                )}

                {/* Nút đăng nhập */}
                <button
                  type="submit"
                  disabled={isSubmitting || status === "Đang đăng nhập..."}
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                </button>

                {/* Quên mật khẩu và Đăng ký */}
                <div className="text-center mt-4">
                  <Link
                    href="/auth/quen-mat-khau"
                    className="text-blue-600 hover:text-orange-500 transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                  <span className="px-2 text-white">|</span>
                  <Link
                    href="/dang-ky"
                    className="text-blue-600 hover:text-orange-500 transition-colors"
                  >
                    Đăng ký
                  </Link>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-4">
                  <div className="text-center text-white mb-4">Hoặc đăng nhập bằng</div>
                  {/* Chỉ hiển thị nút Google nếu provider có sẵn */}
                  {providers?.google && (
                    <button
                      type="button"
                      onClick={() => handleSocialSignIn("google")}
                      className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaGoogle /> Đăng nhập bằng Google
                    </button>
                  )}
                  {/* Chỉ hiển thị nút Facebook nếu provider có sẵn */}
                  {providers?.facebook && (
                    <button
                      type="button"
                      onClick={() => handleSocialSignIn("facebook")}
                      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaFacebook /> Đăng nhập bằng Facebook
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const callbackUrl = query.callbackUrl || process.env.NEXT_PUBLIC_DEFAULT_REDIRECT || "/dashboard";

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
        permanent: false, // Sử dụng permanent: false cho redirect tạm thời
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: {
      providers: providers || {}, // Trả về providers là object rỗng nếu null
      csrfToken: csrfToken || null,
      callbackUrl,
    },
  };
}