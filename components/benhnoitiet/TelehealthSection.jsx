import PropTypes from 'prop-types';
import { BookOpen, Leaf, HeartHandshake } from 'lucide-react';

export default function HormoneHealthSection({ title, features, imageSrc }) {
  return (
    <section className="flex flex-col container mx-auto lg:flex-row items-center py-12 bg-white">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 animate-slide-in-left">
        <img
          src={imageSrc}
          alt="Hormone health illustration"
          className="h-96 w-full object-cover rounded-lg"
        />
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 lg:pl-12 animate-slide-in-right">
        <h1 className="text-2xl uppercase font-bold text-gray-800 mb-6">
          {title}
        </h1>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              {feature.icon}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

HormoneHealthSection.propTypes = {
  title: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.element,
    })
  ),
  imageSrc: PropTypes.string,
};

HormoneHealthSection.defaultProps = {
  title: 'Những giá trị tôi mang đến cho bạn',
  features: [
    {
      title: 'Giáo dục khoa học, dễ hiểu',
      description:
        'Hiểu rõ về nội tiết qua các bài viết, video ngắn gọn, dễ hiểu nhưng vẫn đảm bảo tính chuyên sâu, giúp bạn nắm bắt cơ thể mình.',
      icon: (
        <BookOpen
          className="w-8 h-8 text-blue-500 mr-4"
          strokeWidth={2}
        />
      ), // Icon BookOpen: đại diện cho tri thức và giáo dục
    },
    {
      title: 'Cải thiện nội tiết tự nhiên',
      description:
        'Khám phá các phương pháp tự nhiên như chế độ ăn uống, tập luyện, và lối sống lành mạnh để cân bằng nội tiết mà không cần phụ thuộc vào thuốc.',
      icon: (
        <Leaf
          className="w-8 h-8 text-blue-500 mr-4"
          strokeWidth={2}
        />
      ), // Icon Leaf: biểu tượng cho thiên nhiên và sức khỏe tự nhiên
    },
    {
      title: 'Đồng hành qua mọi giai đoạn',
      description:
        'Từ tuổi trẻ, sau sinh đến tiền mãn kinh, chúng tôi đồng hành cùng bạn để vượt qua mọi thay đổi nội tiết một cách nhẹ nhàng và tự tin.',
      icon: (
        <HeartHandshake
          className="w-8 h-8 text-blue-500 mr-4"
          strokeWidth={2}
        />
      ), // Icon HeartHandshake: thể hiện sự hỗ trợ và đồng hành
    },
  ],
  imageSrc: '/images/5.jpg',
};