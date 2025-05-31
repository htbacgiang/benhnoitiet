import Image from "next/image";
import { FC, useState } from "react";
import { PostDetail as BasePostDetail } from "../../utils/types";
import Link from "next/link";
import { trimText } from "../../utils/helper";

// Extend the base PostDetail type
interface ExtendedPostDetail extends BasePostDetail {
  category: string;
  createdAt: string;
}

interface Props {
  post: ExtendedPostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const PostCard: FC<Props> = ({
  controls = false,
  post,
  busy,
  onDeleteClick,
}): JSX.Element => {
  const { title, slug, meta, thumbnail, createdAt } = post;
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    if (onDeleteClick) {
      onDeleteClick();
    }
    setShowModal(false);
  };

  // Format the date to match the design
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Highlight "emergency" in the title
  const renderTitle = (title: string) => {
    return title.split(" ").map((word, index) =>
      word.toLowerCase() === "emergency" ? (
        <span key={index} className="text-red-500">
          {word.toUpperCase()}{" "}
        </span>
      ) : (
        <span key={index}>
          {word.toUpperCase()}{" "}
        </span>
      )
    );
  };

  return (
    <>
      <div className="flex flex-col">
        {/* Thumbnail */}
        <div className="relative w-full h-64">
          {!thumbnail ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm bg-gray-200">
              No image available
            </div>
          ) : (
            <Image
              src={thumbnail}
              layout="fill"
              alt={title}
              objectFit="cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col space-y-3">
          {/* Title */}
          <Link href={`/bai-viet/${slug}`}>
            <h2 className="text-xl font-bold text-gray-800">
              {renderTitle(title)}
            </h2>
          </Link>

          {/* Date and Author */}
          <div className="text-gray-500 text-sm">
            {formattedDate} 
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-6">
            {trimText(meta, 100)}
          </p>

          {/* Read More Button */}
          <Link href={`/bai-viet/${slug}`}>
            <button className="self-start px-4 py-2 border border-teal-500 text-teal-500 rounded hover:bg-teal-500 hover:text-white transition-colors duration-300">
             Đọc thêm
            </button>
          </Link>

          {/* Controls (Edit/Delete) */}
          {controls && (
            <div className="mt-4 flex justify-between">
              <Link
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                href={`/dashboard/bai-viet/update/${slug}`}
              >
                Sửa
              </Link>
              <button
                disabled={busy}
                onClick={() => setShowModal(true)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Xác nhận</h2>
            <p className="mb-6 text-gray-600">
              Bạn có chắc chắn muốn xóa bài viết này?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                disabled={busy}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;